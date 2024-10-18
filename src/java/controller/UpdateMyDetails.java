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
@WebServlet(name = "UpdateMyDetails", urlPatterns = {"/UpdateMyDetails"})
public class UpdateMyDetails extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(req.getReader(), JsonObject.class);
        Session session = HibernateUtil.getSessionFactory().openSession();

        JsonObject responseJsonObject = new JsonObject();
        responseJsonObject.addProperty("success", false);

        UserDTO userDTO = (UserDTO) req.getSession().getAttribute("user");

        Criteria criteria1 = session.createCriteria(User.class);
        criteria1.add(Restrictions.eq("email", userDTO.getEmail()));

        User user = (User) criteria1.uniqueResult();

        String fname = jsonObject.get("fname").getAsString();
        String lname = jsonObject.get("lname").getAsString();
        String pw1 = jsonObject.get("pw1").getAsString();
        String pw2 = jsonObject.get("pw2").getAsString();

        if (fname.isEmpty()) {

            responseJsonObject.addProperty("content", "Please fill first name");

        } else if (lname.isEmpty()) {

            responseJsonObject.addProperty("content", "Please fill last name");

        } else if (pw1.isEmpty()) {

            user.setFname(fname);
            user.setLname(lname);

            session.update(user);

            responseJsonObject.addProperty("success", true);

        } else {

            if (pw2.isEmpty()) {

                responseJsonObject.addProperty("content", "Please Re-Typed your password");
                responseJsonObject.addProperty("success", false);

            } else {

                if (pw1.equals(pw2)) {
                    user.setFname(fname);
                    user.setLname(lname);
                    user.setPassword(pw1);
                    session.update(user);
                    responseJsonObject.addProperty("success", true);

                } else {
                    responseJsonObject.addProperty("success", false);
                    responseJsonObject.addProperty("content", "Please check your Re-Typed password");

                }

            }

        }

        session.beginTransaction().commit();

        session.close();
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseJsonObject));

    }

}
