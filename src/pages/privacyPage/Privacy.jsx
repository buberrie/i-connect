import React, { useState } from 'react';
import './style.css'
import logoImg from '../../assets/svg/Logo.svg' 





const PrivacyPage = () => {
    const [action, setAction] = useState ("PrivacyPage")



return(

    <div className="wrapper">
        <section className="privacy-logo">
        <img src={logoImg} alt="logo" />
        </section>
            <div> <br />
        
        <div>
        <section className="privacy-header">
            <h1><b>Privacy Policy</b></h1>
            </section>
           </div> 
            
                <section className="privacy.date">
                <p>Effective Date: 22nd of April, 2024</p>
                </section>
            </div> <br />

        
            <section>
                <p><small>This Privacy Policy describes how <b>iCONNECT</b> collects, uses, and discloses your personal information when you use our website (the "Platform"). It also describes the choices you have associated with your data and how you can contact us.</small></p>
            </section>
         <br />

        
            <section className= "privacy-text">
            <h3>Information We Collect</h3>
            <p>We collect the following information when you register for an account on the Platform:</p>
            <li><small>· Personal information such as your name, email address, and contact details, username</small></li>
            <li><small>· Usage data, which helps us understand how you interact with our platform.</small></li>
            <li><small>· Device information, such as your IP address and browser type.</small></li>
            <p>We may also collect additional information that you choose to provide in your profile, such as a bio, location (city and state), and a link to your website or portfolio.</p>
            </section>
        <br />


            <section className= "privacy-text.info">
            <h3>How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <li><small>· Create and manage your account.</small></li>
            <li><small>· Facilitate communication between artisans and customers.</small></li>
            <li><small>· Allow you to create a profile and showcase your work (for artisans).</small></li>
            <li><small>· Allow you to browse artisan profiles and connect with them (for customers).</small></li>
            <li><small>· Send you important information about the Platform, including updates, announcements, and promotional offers (with your consent).</small></li>
            <li><small>· Respond to your inquiries and requests.</small></li>
            <li><small>· Personalizing your experience and deliver relevant content.</small></li>
            <li><small>· Improve the Platform and user experience.</small></li>
            </section>
        <br />

        <div>
            <section className="privacy-text.data">
                <h3>Data Security</h3>
                <p><small>We take the security of your data seriously. We use secure servers to store your information and implement industry-standard security measures to protect it from unauthorized access, disclosure, alteration, or destruction. To protect user privacy, we implement data pseudonymization by replacing names and other identifiers with unique codes, allowing for analysis without compromising individual identities Data exchanges on our website is secured using standardized protocols such as SSL certificates.</small></p>
            </section>
         <br />

        <section className="privacy-text.infor">
            <h3>Sharing Your Information</h3>
            <p>We will not share your personal information with third parties without your consent, except in the following limited circumstances:</p>
            <li><small>· To service providers who help us operate the Platform, such as payment processors or email marketing providers. These service providers will only have access to the information they need to perform their specific services. Such as name, service or skill offered, contact details, username.</small></li>
            <li><small>· To comply with legal or regulatory requirements, we will disclose information to government agencies if required by law. This includes responding to legal requests for national security, law enforcement purposes, or tax reporting. We cooperate with authorities to uphold the law.</small></li>
            <li><small>· We combine information from many users to create anonymous reports (without names or other details). These reports may be shared with third parties and comprise mostly of statistical data.</small></li>
            <li><small>· In the event of a business transfer, such as a merger or acquisition.</small></li>
        </section>
         <br />

        
            <section className="privacy-text.choice">
            <h3>Your Choices</h3>
            <p>You have the following choices regarding your information:</p>
            <li><small>· You can access, update, or delete your information through your account settings.</small></li>
            <li><small>· You can unsubscribe from marketing communications by following the unsubscribe instructions in the emails we send you.</small></li>
            </section>
         <br />

        
            <section className="privacy-text.third">
                <h3>Third Party Links</h3>
                <p><small> This website contains links to external resources. Clicking these links will direct you to websites maintained by third parties. We are not responsible for the content or privacy practices of these external sites. We recommend you review their policies before providing any personal information.</small></p>
            </section>
         <br />

        
            <section className="privacy-text.child">
                <h3>Children's Privacy</h3>
                <p><small>Our Platform is not directed to children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us. We will take steps to delete the information from our servers.</small></p>
            </section>
         <br />

        
            <section className="privacy-text.changes">
                <h3>Changes to this Privacy Policy</h3>
                <p><small>We may update this Privacy Statement from time to time in response to changing regulatory, legal or operational requirements. We will provide notice of any such changes (including when they will take effect) in accordance with law. Your continued use of our service after any such updates take effect will constitute acknowledgement and acceptance of those changes.</small></p>
            </section>
         <br />

        
            <section className="privacy-text.contact">
                <h3>Contact Us</h3>
               <p><small>If you have any questions about this Privacy Policy, please contact us at</small></p>
               <p>[Your Email Address]</p>
            </section>
            <br />
        
     </div>
    </div>


)





};





export default PrivacyPage;