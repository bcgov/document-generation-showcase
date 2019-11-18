<template>
  <v-footer absolute
            padless
            class="footer">
    <v-container class="py-0">
      <ul>
        <li><v-btn text
                   id='footer-home'
                   href="https://www.gov.bc.ca/">Home</v-btn></li>
        <li><v-btn text
                   id="footer-about"
                   href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca">About gov.bc.ca</v-btn></li>
        <li><v-btn text
                   id="footer-disclaimer"
                   href="http://gov.bc.ca/disclaimer">Disclaimer</v-btn></li>
        <li><v-btn text
                   id="footer-privacy"
                   href="http://gov.bc.ca/privacy">Privacy</v-btn></li>
        <li><v-btn text
                   id="footer-accessibility"
                   href="http://gov.bc.ca/webaccessibility">Accessibility</v-btn></li>
        <li><v-btn text
                   id="footer-copyright"
                   href="http://gov.bc.ca/copyright">Copyright</v-btn></li>
        <li><v-btn text
                   href="https://www2.gov.bc.ca/gov/content/home/contact-us">Contact Us</v-btn></li>

      </ul>
    </v-container>
  </v-footer>
</template>

<script>
export default {};
</script>

<style>
    .footer .container {
        background-color: rgb(0, 51, 102);
        border-top: 2px solid rgb(252, 186, 25);
        min-height: 45px;
        min-width: 100%;
        z-index: 999;
    }

    .footer .v-btn {
        color: #fff;
        text-decoration: none;
        text-transform: none;
      font-size: 0.813em;
    }

    .v-btn--active.footer:before,
    .v-btn.footer:focus:before,
    .v-btn.footer:hover:before {
        background: none;
    }

    .footer ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 0;
      color: #fff;
      list-style: none;
      align-items: center;
      height: 100%;
    }

    .footer ul li a {
      font-size: 0.813em;
      font-weight: normal;  /* 400 */
      color: #fff;
      border-right: 1px solid #4b5e7e;
      padding-left: 5px;
      padding-right: 5px;
    }

    .footer a:hover {
      color: #fff;
      text-decoration: underline;
    }

    .footer a:focus {
      outline: none;
    }

    .footer :focus {
      outline: 4px solid #3B99FC;
      outline-offset: 1px;
    }

</style>
