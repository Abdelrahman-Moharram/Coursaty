import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import ButtonLink from '@/Components/Common/ButtonLink';
import { GrMoney } from 'react-icons/gr';

let stripePromise: any = ''
if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY){
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
}
export default function StripePayment({course_id}:{course_id:string}) {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  return (

    <ButtonLink href={process.env.NEXT_PUBLIC_HOST +`/api/courses/${course_id}/buy/stripe`}> <GrMoney /> Buy Now</ButtonLink>
  );
}