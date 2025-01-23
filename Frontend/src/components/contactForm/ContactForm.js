import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactForm.scss";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    termsAccepted: false,
    showPopup: false, // Pour gérer l'affichage de la popup
  });

  // Initialisation avec le Public Key d'EmailJS
  emailjs.init("RI5tiZaL8Pnf55vha"); // Utilise ton Public Key ici

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification de la case à cocher des conditions d'utilisation
    if (!formData.termsAccepted) {
      alert("Veuillez accepter les conditions d'utilisation.");
      return;
    }

    // Paramètres du template à envoyer à EmailJS
    const templateParams = {
      to_name: formData.firstName,
      from_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    // Envoi de l'email via EmailJS
    emailjs
      .send(
        "service_l9dpdj9", // Ton Service ID
        "template_g7j3egp", // Ton Template ID
        templateParams
      )
      .then(
        (response) => {
          console.log("Message envoyé avec succès", response);
          // Affiche la popup lorsque le message est envoyé avec succès
          setFormData({ ...formData, showPopup: true });

          // Cache la popup après 3 secondes
          setTimeout(() => {
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              message: "",
              termsAccepted: false,
              showPopup: false,
            });
          }, 3000); // Réinitialise le formulaire après 3 secondes
        },
        (err) => {
          console.error("Erreur d'envoi", err);
        }
      );
  };

  return (
    <div className="contact-container">
      <h1>Contactez-nous</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Nom</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Téléphone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            J'accepte les conditions d'utilisation
          </label>
        </div>

        <button type="submit" className="submit-button">
          Envoyer
        </button>
      </form>

      {/* Popup pour message envoyé */}
      {formData.showPopup && (
        <div className="popup">
          <p>Votre message a bien été envoyé ✅</p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
