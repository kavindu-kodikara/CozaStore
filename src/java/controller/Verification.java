/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dto.ResponseDTO;
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
@WebServlet(name = "Verification", urlPatterns = {"/Verification"})
public class Verification extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        ResponseDTO responseDTO = new ResponseDTO();

        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(req.getReader(), JsonObject.class);

        String verificationCode = jsonObject.get("code").getAsString();

        if (req.getSession().getAttribute("email") != null) {

            String email = req.getSession().getAttribute("email").toString();
            Session session = HibernateUtil.getSessionFactory().openSession();

            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("email", email));
            criteria1.add(Restrictions.eq("verification", verificationCode));

            if (!criteria1.list().isEmpty()) {
                User user = (User) criteria1.list().get(0);
                user.setVerification("verified");

                session.update(user);
                session.beginTransaction().commit();

                req.getSession().removeAttribute("email");
                
                UserDTO userDTO = new UserDTO();
                userDTO.setEmail(user.getEmail());
                userDTO.setFname(user.getFname());
                userDTO.setLname(user.getLname());
                userDTO.setPassword(null);

                req.getSession().setAttribute("user", userDTO);

                responseDTO.setSuccess(true);
                responseDTO.setContent("Verification Success");
            } else {

                responseDTO.setContent("Invalied verification code!");

            }

        } else {
            responseDTO.setContent("Invalid email! Please Sign in");
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseDTO));

    }

}
