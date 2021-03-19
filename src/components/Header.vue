<template>
  <div>
    <header>
      <nav>
        <div class="logo"><span><router-link to="/" exact>EATSY</router-link></span></div>
        <div class="menu">
          <input type="text" placeholder=" Search by keyword!" />
          <button>
            <span>
                <Iconify  :icon ="icons.mg"/>
            </span>
          </button>
        </div>
        <div class="login">
          <ul>
            <li><router-link to="/login" exact>Login</router-link></li>
            <li><router-link to="/favorite" exact>❤</router-link></li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import Iconify from '@iconify/vue';
import magnifyingGlassIcon from '@iconify-icons/entypo/magnifying-glass'
export default {
    components: {
        Iconify,
    }, 
    data() {
        return {
            icons: {
                mg: magnifyingGlassIcon
            }
        }
    }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
}
header {
  box-sizing: border-box;
  width: 100vw;
  height: 100px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #e3dddf;
  top: 0;
}
nav {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.menu {
  display: flex;
  width: 50%;
  justify-content: center;
  height: 40%;
}

.menu > input {
  display: flex;
  width: 80%;
  border-radius: 15px;
  align-items: center;
  font-size: 20px;
}

.menu > button {
  border-radius: 15px;
  width: 10%;
  font-size: 30px;
}


.logo {
  display: flex;
  width: 20%;
  height: 50%;
  justify-content: center;
}
.logo span {
  font-size: 40px;
  letter-spacing: 2px;
  line-height: 48px;
}
.login {
  display: flex;
  height:50%;
  width: 30%;
  justify-content: flex-end;
}

.login ul,
.ul {
  display: flex;
}
.login ul li a,
.menu ul li a {
  padding: 20px;
  color: black;
  font-size: 40px;
  line-height: 48px;
}

</style>