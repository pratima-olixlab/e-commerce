const STRIPE_CONFIG = {
    SECRET_KEY:"pk_test_51OQMS8SBmrKIRoJWhVgg6myQKYC6OSEFOCcVQLT3TMBs7LWV30GvB9MZkKYAKBOzdnLQQTta3ZlQYTIcrJmfqNbs00NlzjPYwh",
    CURRENCY: "USD",
    SUCCES_URL : "http://localhost:4200/success?session_id={CHECKOUT_SEASON_ID}",
    CANCEL_URL : "http://localhost:4200/payment"
};

module.exports = {
    STRIPE_CONFIG
}