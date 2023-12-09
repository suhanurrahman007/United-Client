import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const Membership = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);

    
    return (
      <Container>
        <SectionTitle header={"Payment"} miniHeader={"Membership payment here "}></SectionTitle>
        <div>
         <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
         </Elements>
        </div>
      </Container>
    );
};

export default Membership;