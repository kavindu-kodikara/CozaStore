<%-- 
    Document   : test
    Created on : Sep 17, 2024, 10:40:27 AM
    Author     : kv
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <p>
            <% 
            
            out.print(session.getCreationTime());
            
            %>
        </p>
    </body>
</html>
