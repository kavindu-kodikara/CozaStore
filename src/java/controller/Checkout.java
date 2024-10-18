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
import entity.OrderItem;
import entity.OrderStatus;
import entity.Product;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.HibernateUtil;
import model.PayHere;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author kv
 */
@WebServlet(name = "Checkout", urlPatterns = {"/Checkout"})
public class Checkout extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject requestJsonObject = gson.fromJson(req.getReader(), JsonObject.class);

        JsonObject responseJsonObject = new JsonObject();
        responseJsonObject.addProperty("success", false);

        HttpSession httpsession = req.getSession();

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();

        Boolean isCurrentAddress = requestJsonObject.get("isCurrentAddress").getAsBoolean();
        String fname = requestJsonObject.get("fname").getAsString();
        String lname = requestJsonObject.get("lname").getAsString();
        String line1 = requestJsonObject.get("line1").getAsString();
        String line2 = requestJsonObject.get("line2").getAsString();
        String postalCode = requestJsonObject.get("postalCode").getAsString();
        String mobile = requestJsonObject.get("mobile").getAsString();
        String cityId = requestJsonObject.get("city").getAsString();

        if (httpsession.getAttribute("user") != null) {
            //user signed in

            //get user from db
            UserDTO user_DTO = (UserDTO) httpsession.getAttribute("user");
            Criteria criteria1 = session.createCriteria(User.class);
            criteria1.add(Restrictions.eq("email", user_DTO.getEmail()));
            User user = (User) criteria1.uniqueResult();

            if (isCurrentAddress) {
                //get current address
                Criteria criteria2 = session.createCriteria(Address.class);
                criteria2.add(Restrictions.eq("user", user));
                criteria2.addOrder(Order.desc("id"));
                criteria2.setMaxResults(1);

                if (criteria2.list().isEmpty()) {
                    //current address not found. create a new address
                    responseJsonObject.addProperty("msg", "Current address not found. please create a new address");

                } else {
                    //get current address found
                    Address address = (Address) criteria2.list().get(0);

                    //***Compleate the chkout process
                    saveOrders(session, transaction, address, user, responseJsonObject);
                }

            } else {
                //create new address

                if (fname.isEmpty()) {
                    responseJsonObject.addProperty("msg", "Please fill first name");
                } else if (lname.isEmpty()) {
                    responseJsonObject.addProperty("msg", "Please fill last name");
                } else if (cityId.isEmpty()) {
                    responseJsonObject.addProperty("msg", "Please select city");
                } else {

                    Criteria criteria3 = session.createCriteria(City.class);
                    criteria3.add(Restrictions.eq("id", Integer.parseInt(cityId)));

                    if (criteria3.list().isEmpty()) {
                        responseJsonObject.addProperty("msg", "Invalid city");
                    } else {
                        //City found
                        City city = (City) criteria3.list().get(0);

                        if (line1.isEmpty()) {
                            responseJsonObject.addProperty("msg", "Please sfill lline1");
                        } else if (line2.isEmpty()) {
                            responseJsonObject.addProperty("msg", "Please sfill lline2");
                        } else if (postalCode.isEmpty()) {
                            responseJsonObject.addProperty("msg", "Please sfill postal code");
                        } else if (postalCode.length() > 5) {
                            responseJsonObject.addProperty("msg", "Invalid postal code");
                        } else if (mobile.isEmpty()) {
                            responseJsonObject.addProperty("msg", "Please sfill mobile number");
                        } else {
                            //create new address

                            Address address = new Address();
                            address.setCity(city);
                            address.setFname(fname);
                            address.setLine1(line1);
                            address.setLine2(line2);
                            address.setLname(lname);
                            address.setMobile(mobile);
                            address.setPostalCode(postalCode);
                            address.setUser(user);

                            session.save(address);

                            //***compleate the checkout process
                            saveOrders(session, transaction, address, user, responseJsonObject);
                        }
                    }

                }

            }

        } else {
            //user not
            responseJsonObject.addProperty("msg", "User not signed in");
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseJsonObject));

    }

    private void saveOrders(Session session, Transaction transaction, Address address, User user, JsonObject responseJsonObject) {
        try {
            //Create order in DB
            entity.Orders order = new entity.Orders();
            order.setDatetime(new Date());
            order.setUser(user);
            order.setAddress(address);

            int orderId = (int)session.save(order);

            //get cart items
            Criteria criteria4 = session.createCriteria(Cart.class);
            criteria4.add(Restrictions.eq("user", user));
            List<Cart> cartList = criteria4.list();

            //get order status from db
            OrderStatus orderStatus = (OrderStatus) session.get(OrderStatus.class, 5);

            double amount = 0;
            String item = "";

            //create order Item in DB
            for (Cart cartItem : cartList) {

                //Calculate amoint
                amount += (cartItem.getQty() * cartItem.getProduct().getPrice());

                if(address.getCity().getId() == 1){
                    amount += 300;
                }else{
                    amount += 500;
                }
                
                //calculate 
                item += cartItem.getProduct().getTitle() + " x" + cartItem.getQty() + " ";

                Product product = cartItem.getProduct();

                OrderItem orderItem = new OrderItem();
                orderItem.setOrderStatus(orderStatus);
                orderItem.setProduct(product);
                orderItem.setQty(cartItem.getQty());
                orderItem.setOrders(order);

                session.save(orderItem);

                //update product qty in db
                product.setQty(product.getQty() - cartItem.getQty());
                session.update(product);

                //Delete cart item frm db
                session.delete(cartItem);

            }

            transaction.commit();
            
            
            String merchant_id = "1221102";
            String formatedAmount = new DecimalFormat("0.00").format(amount);
            String currency = "LKR";
            String merchanSecret = "MzMxMTYxNjcwOTQ5NzUyNzgwMDI0OTg0NDM4ODA2MjcyODE4NDg=";
            String merchantSecratMd5Hash = PayHere.generateMD5(merchanSecret);
            

            //paymet gaytway
            JsonObject payhere = new JsonObject();
            payhere.addProperty("sandbox", true);
            payhere.addProperty("merchant_id", merchant_id);
            
            payhere.addProperty("return_url", "");
            payhere.addProperty("cancel_url", "");
            payhere.addProperty("notify_url", "https://dfd8-2402-4000-b282-df7-5d15-f2f2-46f9-8142.ngrok-free.app/CozaStore/VerifyPayments");
            
            payhere.addProperty("first_name", user.getFname());
            payhere.addProperty("last_name", user.getLname());
            payhere.addProperty("email", user.getEmail());
            
            payhere.addProperty("city", "Colombo");
            payhere.addProperty("country", "Sri lanka");
            payhere.addProperty("phone", "0776655444");
            payhere.addProperty("address", "No 38 Havlok city");
            
            
            payhere.addProperty("order_id", String.valueOf(orderId));
           
            payhere.addProperty("items", item);
            payhere.addProperty("amount", formatedAmount);
            payhere.addProperty("currency", currency);
           
            
           String md5Hash = PayHere.generateMD5(merchant_id + orderId + formatedAmount + currency + merchantSecratMd5Hash);
            // Generate md5 hash

            payhere.addProperty("hash", md5Hash);
            System.out.println(md5Hash);
            
            
            responseJsonObject.addProperty("success", true);
            responseJsonObject.addProperty("msg", "Checkout Completed");
            
            Gson gson = new Gson();
            responseJsonObject.add("payhereJson", gson.toJsonTree(payhere));


        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
        }
    }

}
