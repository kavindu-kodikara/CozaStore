/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.Cart_DTO;
import dto.ResponseDTO;
import dto.UserDTO;
import entity.Cart;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
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
@WebServlet(name = "SignIn", urlPatterns = {"/SignIn"})
public class SignIn extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        ResponseDTO responseDTO = new ResponseDTO();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

        UserDTO userDTO = gson.fromJson(req.getReader(), UserDTO.class);

        if (userDTO.getEmail().isEmpty()) {
            responseDTO.setContent("Pleace enter your email");
        } else if (userDTO.getPassword().isEmpty()) {
            responseDTO.setContent("Please enter you password");
        } else {

            Session session = HibernateUtil.getSessionFactory().openSession();

            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("email", userDTO.getEmail()));
            criteria1.add(Restrictions.eq("password", userDTO.getPassword()));

            if (!criteria1.list().isEmpty()) {

                User user = (User) criteria1.list().get(0);

                if (!user.getVerification().equals("verified")) {
                    //not verified

                    req.getSession().setAttribute("email", userDTO.getEmail());
                    responseDTO.setContent("unverified");

                    System.out.println("unverifid user");

                } else {
                    //verified
                    System.out.println("verified user");

                    userDTO.setFname(user.getFname());
                    userDTO.setLname(user.getLname());
                    userDTO.setPassword(null);

                    req.getSession().setAttribute("user", userDTO);
                    
                    
                    
                    //tranfer session cart to DB cart
                    if (req.getSession().getAttribute("sessionCart") != null) {
                        
                        ArrayList<Cart_DTO> sessionCart = (ArrayList<Cart_DTO>) req.getSession().getAttribute("sessionCart");
                        
                        Criteria criteria2 = session.createCriteria(Cart.class);
                        criteria2.add(Restrictions.eq("user", user));
                        List<Cart> dbCart = criteria2.list();
                        
                        if (dbCart.isEmpty()) {
                            //DB cart is empty
                            //add all session cart items to db cart
                            for (Cart_DTO cart_DTO : sessionCart) {
                                Cart cart = new Cart();
                                cart.setProduct(cart_DTO.getProduct());
                                cart.setQty(cart_DTO.getQty());
                                cart.setUser(user);
                                session.save(cart);
                            }
                        } else {
                            //Found items in DB cart

                            for (Cart_DTO cart_DTO : sessionCart) {
                                boolean isFoundInDBCart = false;
                                
                                for (Cart cart : dbCart) {
                                    
                                    if (cart_DTO.getProduct().getId() == cart.getProduct().getId()) {
                                        //same item found in session cart & db cart
                                        isFoundInDBCart = true;
                                        
                                        if ((cart_DTO.getQty() + cart.getQty()) <= cart.getProduct().getQty()) {
                                            //quantity available
                                            cart.setQty(cart_DTO.getQty() + cart.getQty());
                                            session.update(cart);
                                            
                                        } else {
                                            //quantity not available
                                            //set max availbe aty
                                            
                                            cart.setQty(cart.getProduct().getQty());
                                            session.update(cart);
                                            
                                        }
                                        
                                    }
                                    
                                }
                                if (!isFoundInDBCart) {
                                    //not found in DB cart
                                    Cart cart = new Cart();
                                    cart.setProduct(cart_DTO.getProduct());
                                    cart.setQty(cart_DTO.getQty());
                                    cart.setUser(user);
                                    session.save(cart);
                                }
                            }
                            
                        }
                        req.getSession().removeAttribute("sessionCart");
                        session.beginTransaction().commit();
                        
                    }
                    
                    

                    responseDTO.setSuccess(true);
                    responseDTO.setContent("Success");

                }

            } else {

                responseDTO.setContent("Invalid credintion");

                System.out.println("Invalid credintion");

            }

            session.close();
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseDTO));

    }

}
