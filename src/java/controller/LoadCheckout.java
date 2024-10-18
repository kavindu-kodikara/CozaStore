/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.UserDTO;
import entity.Address;
import entity.Cart;
import entity.City;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author kv
 */
@WebServlet(name = "LoadCheckout", urlPatterns = {"/LoadCheckout"})
public class LoadCheckout extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("success", false);
        jsonObject.addProperty("foundAddress", false);

        HttpSession httpSession = req.getSession();
        Session session = HibernateUtil.getSessionFactory().openSession();

        if (httpSession.getAttribute("user") != null) {
            //signed in

            UserDTO user_DTO = (UserDTO) httpSession.getAttribute("user");

            //get user from DB
            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("email", user_DTO.getEmail()));
            User user = (User) criteria1.uniqueResult();

            //get user's last address from DB
            Criteria criteria2 = session.createCriteria(Address.class);
            criteria2.add(Restrictions.eq("user", user));
            criteria2.addOrder(Order.desc("id"));
            criteria2.setMaxResults(1);

            //get cities from DB
            Criteria criteria3 = session.createCriteria(City.class);
            criteria3.addOrder(Order.asc("name"));
            List<City> cityList = criteria3.list();

            //get cart item from DB
            Criteria criteria4 = session.createCriteria(Cart.class);
            criteria4.add(Restrictions.eq("user", user));
            List<Cart> cartList = criteria4.list();

            //pack cart item
            for (Cart cart : cartList) {
                cart.setUser(null);
                cart.setUser(null);
                cart.getProduct().setUser(null);
            }

            jsonObject.add("cartitemList", gson.toJsonTree(cartList));

            //pack citylist to json object
            jsonObject.add("cityList", gson.toJsonTree(cityList));

            if (!criteria2.list().isEmpty()) {

                jsonObject.addProperty("foundAddress", true);

                Address address = (Address) criteria2.list().get(0);

                //pack address to json object
                address.setUser(null);
                jsonObject.add("address", gson.toJsonTree(address));

            }

            jsonObject.addProperty("success", true);

        } else {
            //not signed in
            jsonObject.addProperty("msg", "Not signed in");
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));
        session.close();

    }

}
