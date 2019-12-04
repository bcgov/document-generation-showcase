<template>
  <nav class="navigation-main">
    <div class="container">
      <ul>
        <li>
          <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'cdogs' }">CDOGS v1</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.navigation-main {
  display: block;
  /* position: fixed; */
  top: 65px;
  color: #fcba19;
  background-color: #38598a;
  width: 100%;
  -webkit-box-shadow: 0 6px 8px -4px #b3b1b3;
  -moz-box-shadow: 0 6px 8px -4px #b3b1b3;
  box-shadow: 0 6px 8px -4px #b3b1b3;
  /* z-index: 999; */
}

.navigation-main .container {
  padding: 10px 0 10px 0;
}

.navigation-main .container ul {
  display: flex;
  flex-direction: row;
  margin: 0;
  color: #fff;
  list-style: none;
  margin-left: -25px;
}

.navigation-main .container ul li ~ li {
  border-left: 1px solid #9b9b9b;
  margin: 0;
}

.navigation-main .container ul li a {
  display: flex;
  font-size: 0.813em;
  font-weight: normal; /* 400 */
  color: #fff;
  padding: 0 15px 0 15px;
  text-decoration: none;
}

.navigation-main .container ul li a:hover {
  text-decoration: underline;
}

.navigation-main .container ul li a:focus {
  outline: none;
  outline-offset: 0;
}

.navigation-main .container ul .active {
  text-decoration: underline;
  font-weight: bold;
}

@media screen and (max-width: 959px) {
  .navigation-main {
    top: 57px;
  }
}

@media screen and (min-width: 960px) {
  .navigation-main {
    top: 65px;
  }
}
</style>
