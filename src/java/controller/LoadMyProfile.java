/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.UserDTO;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author kv
 */
@WebServlet(name = "LoadMyProfile", urlPatterns = {"/LoadMyProfile"})
public class LoadMyProfile extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("success", false);

        Session session = HibernateUtil.getSessionFactory().openSession();

        if (req.getSession().getAttribute("user") != null) {

            UserDTO userDTO = (UserDTO) req.getSession().getAttribute("user");

            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("email", userDTO.getEmail()));
            
            User user = (User) criteria1.uniqueResult();
            
            user.setEmail(null);
            user.setId(0);
            user.setVerification(null);
            
            jsonObject.add("details", gson.toJsonTree(user));
            jsonObject.addProperty("success", true);

        }

        session.close();
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject));

    }

}
