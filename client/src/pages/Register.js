import React from "react";
import Nav from "../components/Nav";
import { isAbsolute } from "path";

function Register() {
    return (
        <div>
            <Nav />
            <p>Registration page</p>
            <a href = '/sale'>Register</a>
        </div>
//         <Form>
//             <Form.Group controlId="formBasicEmail">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control type="email" placeholder="Enter email" />
//                 <Form.Text className="text-muted">
//                     We'll never share your email with anyone else.
//     </Form.Text>
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" placeholder="Password" />
//             </Form.Group>
//             <Form.Group controlId="formBasicChecbox">
//                 <Form.Check type="checkbox" label="Check me out" />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//                 Submit
//   </Button>
//         </Form>
    );
}

export default Register;