
<h1>Clothing E-commerce Web Application</h1>

<p>This project is a clothing e-commerce web application developed primarily to master Java backend development with Hibernate. It features a fully functional backend integrated with an HTML template for the frontend, allowing users to sign in, browse products, manage their cart, and complete purchases via a payment gateway.</p>

<h2>Features</h2>
<ul>
    <li><strong>User Authentication:</strong> Sign-up and sign-in functionalities to authenticate users and maintain sessions.</li>
    <li><strong>Home Page:</strong> A dynamic home page showcasing featured products, special offers, and clothing categories.</li>
    <li><strong>Advanced Search:</strong> Users can search for clothing items with various filters, improving product discovery.</li>
    <li><strong>Cart Management:</strong>
        <ul>
            <li><strong>Session Cart:</strong> Allows users to add items to their cart without signing in.</li>
            <li><strong>Database Cart:</strong> Saves cart items for registered users across sessions.</li>
        </ul>
    </li>
    <li><strong>Checkout Process:</strong>
        <ul>
            <li><strong>Payment Gateway:</strong> Integrates a secure payment gateway to process orders.</li>
            <li><strong>Order Confirmation:</strong> Sends email confirmations upon successful checkout.</li>
        </ul>
    </li>
    <li><strong>Product Management:</strong> Admins can add new products through a dedicated interface.</li>
    <li><strong>Email Notifications:</strong> Users receive notifications for account registration, order updates, and promotional offers.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
    <li><strong>Backend:</strong> Java with Hibernate ORM for database management</li>
    <li><strong>Frontend:</strong> HTML template for UI design and user interactions</li>
    <li><strong>Database:</strong> MySQL</li>
    <li><strong>Session Management:</strong> Utilizes Java session handling to manage cart and user sessions</li>
    <li><strong>Payment Gateway:</strong> Integrated with a third-party payment provider (PayHear)</li>
    <li><strong>Email Sending:</strong> JavaMail API for sending email notifications</li>
</ul>

<h2>Project Setup</h2>
<ol>
    <li><strong>Clone the repository:</strong>
        <pre><code>git clone https://github.com/yourusername/your-repository.git</code></pre>
    </li>
    <li><strong>Set up the database:</strong>
        <p>Create a MySQL database (or configure another database) and update the connection details in <code>hibernate.cfg.xml</code>.</p>
    </li>
    <li><strong>Configure email and payment gateway:</strong>
        <p>Update email SMTP settings and payment gateway API keys in the respective configuration files.</p>
    </li>
    <li><strong>Run the application:</strong>
        <p>Compile and run the Java backend using your preferred IDE or build tool (e.g., Maven/Gradle). Access the application through <code>http://localhost:8080</code>.</p>
    </li>
</ol>

<h2>Future Enhancements</h2>
<ul>
    <li>Implement product reviews and ratings.</li>
    <li>Add more advanced filtering options for search.</li>
    <li>Include order tracking for customers.</li>
</ul>
