<template>
  <v-footer absolute padless class="gov-footer">
    <ul>
      <li>
        <v-btn text id="footer-home" href="https://www.gov.bc.ca/">Home</v-btn>
      </li>
      <li>
        <v-btn
          text
          id="footer-about"
          href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca"
        >About gov.bc.ca</v-btn>
      </li>
      <li>
        <v-btn text id="footer-disclaimer" href="http://gov.bc.ca/disclaimer">Disclaimer</v-btn>
      </li>
      <li>
        <v-btn text id="footer-privacy" href="http://gov.bc.ca/privacy">Privacy</v-btn>
      </li>
      <li>
        <v-btn text id="footer-accessibility" href="http://gov.bc.ca/webaccessibility">Accessibility</v-btn>
      </li>
      <li>
        <v-btn text id="footer-copyright" href="http://gov.bc.ca/copyright">Copyright</v-btn>
      </li>
      <li>
        <v-btn text href="https://www2.gov.bc.ca/gov/content/home/contact-us">Contact Us</v-btn>
      </li>
    </ul>
  </v-footer>
</template>

<script>
export default {};
</script>

<style>
footer.gov-footer.v-footer {
  background-color: rgb(0, 51, 102);
  border-top: 2px solid rgb(252, 186, 25);
  min-height: 45px;
  min-width: 100%;
  /* z-index: 999; */
}

.gov-footer .v-btn {
  color: #fff;
  text-decoration: none;
  text-transform: none;
  font-size: 0.75rem;
}

.v-btn--active.gov-footer:before,
.v-btn.gov-footer:focus:before,
.v-btn.gov-footer:hover:before {
  background: none;
}

.gov-footer ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
  color: #fff;
  list-style: none;
  align-items: center;
  height: 100%;
}

.gov-footer ul li ~ li {
  border-left: 1px solid #4b5e7e;
  margin: 0;
}

.gov-footer ul li a {
  font-size: 0.813em;
  font-weight: normal; /* 400 */
  color: #fff;
  padding-left: 5px;
  padding-right: 5px;
}

.gov-footer a:hover {
  color: #fff;
  text-decoration: underline;
}

.gov-footer a:focus {
  outline: none;
}

.gov-footer :focus {
  outline: 4px solid #3b99fc;
  outline-offset: 1px;
}
</style>
