/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
import model.Mail;
import model.Validation;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author kv
 */
@WebServlet(name = "SignUp", urlPatterns = {"/SignUp"})
public class SignUp extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        ResponseDTO responseDTO = new ResponseDTO();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

        UserDTO userDTO = (UserDTO) gson.fromJson(req.getReader(), UserDTO.class);

        if (userDTO.getFname().isEmpty()) {
            responseDTO.setContent("Pleace enter your first name");
        } else if (userDTO.getLname().isEmpty()) {
            responseDTO.setContent("Pleace enter your last name");
        } else if (userDTO.getEmail().isEmpty()) {
            responseDTO.setContent("Pleace enter your email name");
        } else if (!Validation.isEmailValid(userDTO.getEmail())) {
            responseDTO.setContent("Pleace enter valid email");
        } else if (userDTO.getPassword().isEmpty()) {
            responseDTO.setContent("Pleace enter your password");
        } else {

            
            Session session = HibernateUtil.getSessionFactory().openSession();

            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("email", userDTO.getEmail()));

            if (!criteria1.list().isEmpty()) {
                responseDTO.setContent("User with this email is alredy exsist");
            } else {

                //generate verification code
                int code = (int) (Math.random() * 1000000);

                User user = new User();
                user.setEmail(userDTO.getEmail());
                user.setFname(userDTO.getFname());
                user.setLname(userDTO.getLname());
                user.setPassword(userDTO.getPassword());
                user.setVerification(String.valueOf(code));

                //send verification email
                Thread sendMailThread = new Thread(){
                    @Override
                    public void run() {
                        Mail.sendMail(userDTO.getEmail(), "Coza Store", "<h1>" + user.getVerification() + "</h1>");
                    }
                
                };
                
                sendMailThread.start();

                session.save(user);
                session.beginTransaction().commit();

                req.getSession().setAttribute("email", userDTO.getEmail());
                responseDTO.setSuccess(true);
                responseDTO.setContent("Registration compleate. Pleace verify your account to Sign in");

            }

            session.close();

        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseDTO));
        System.out.println(responseDTO);

    }

}
