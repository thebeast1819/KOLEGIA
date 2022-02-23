import Feedback_details from './Feedback_details';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './feedback.css';

const Feedback = () => {
  
    const testiMonials = [
        {
            user : "Vikas" ,
            message : "It is so helpful. I forgot my assignment file in the IEEE Lab and when I checked in that room, it was not there. So I posted it on Kolegia and the one who took it returned it back. Thanks to Kolegia." 
        },
        {
            user : "Manish" ,
            message : "Kolegia helped me a lot. I used to forget my small goods here and there when I was in my first year but thanks to Kolegia."
        },
        {
            user : "Akash" ,
            message : "When I was new in the college, I don't have laptop and at that time, I was not in the condition to buy a new laptop. I was confused how to ask seniors if they want to sell their old laptop but then I came to know about Kolegia and my problem was solved." 
        },
        {
            user : "Vaibhav" ,
            message : "Kolegia is such a helpful platform for all the students in such a big college. It provides a lot of functionality which helps to solve common problems of students."
        },
    ]

    const options = {
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    };
    return (
        <section id="testimonial" className="testimonials">
            <div className="container12">
                <h1 style={{paddingTop:"1rem",fontFamily:"cursive"}}>A Message From Our Users</h1>
                <div className="row12">
                    <div className="col12">
                        <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options}>
                            {
                            testiMonials.map(feedbackDetail => {
                                return (
                                    <Feedback_details feedbackDetail={feedbackDetail} key={feedbackDetail._key} />
                                )
                            })
                            }
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;