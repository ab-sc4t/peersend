describe('PeerSend Registration and Login', () => {
    it('registers a new user and logs them in successfully', () => {
        const username = 'abayush4';
        const email = 'ayush' + Date.now() + '@gmail.com'; // unique email
        const password = 'Test';

        // Step 1: Visit the registration page
        cy.visit('http://localhost:3000/signup');

        // Fill the registration form
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="firstname"]').type('Ayush');
        cy.get('input[name="lastname"]').type('Bansal');
        cy.get('input[name="email"]').type(email); // unique email
        cy.get('input[name="password"]').type(password);

        // Submit the registration form
        cy.contains('button', 'Register').click();

        // Step 2: Assert that the user is redirected to the login page
        cy.url({timeout: 10000}).should('include', '/signin'); // Ensure URL includes /signin

        // Optionally check for the presence of 'Login' text or another element
        cy.contains('Login').should('exist');

        // Step 3: Log in with the newly created user credentials
        cy.visit('http://localhost:3000/signin'); // Visit the login page

        // Fill the login form with the registered credentials
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);

        // Submit the login form
        cy.contains('button', 'Login').click();

        // Step 4: Assert successful login by checking if the user is redirected to the home page or dashboard
        cy.url({timeout: 10000}).should('not.include', '/signin'); // Should not be on the signin page anymore
        cy.contains('Privacy-First P2P Messaging Platform').should('exist'); // Assuming you have a 'Welcome' text or a similar indicator of a successful login
    });
});
