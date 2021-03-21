<template>
 <!-- Site footer -->
	<footer class="site-footer">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        
		<div class = "container">
			<div class="grid-container">
				<div class="grid-item inner-grid-container">
					
					<div class="grid-item">
						<span id = "eatsy"> EATSY </span>
                        <br>
                        As a local directory site consolidating homemade <br> baked goods, Eatsy connects Singapore’s talented <br> home bakers with consumers to support local businesses. 
                    </div>   
					<div class="grid-item">
						<span id = "subtitle"> SELL </span>
						<br>
                        <a href="">Sell on EATSY</a>
                    </div>   
					<div class="grid-item">
						<span id = "subtitle">HELP</span>
                        <br>
                        <a href="">FAQs</a>
                    </div>   
					<div class="grid-item">
						<span id = "subscribe">Yes! Send me exclusive offers on Eatsy</span>
                        <br>
						<div class = "button-wrapper">
                        <input type="text" placeholder="Enter your email" /> 
                        <button>Subscribe</button>
						</div>
                    </div>   
					<div class="grid-item"><a href="">Contact us</a></div>   

				</div>
				<!--
				<div class="grid-item">
					<div class = "social-buttons">
						<a href= ""><i class="fab fa-instagram circle-icon"></i></a>
						<a href= ""><i class="fab fa-facebook circle-icon"></i></a>
						<a href= ""><i class="fab fa-linkedin-in circle-icon"></i></a>
						<a href= ""><i class="fab fa-twitter circle-icon"></i></a>
					</div>
				</div>   
				-->
			</div>
		</div>
			<p>Copyright © 2021 | EATSY</p>
	</footer>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
}
.site-footer {
	position: relative;
	background-color:#e3dddf;
	width: 100%;	
	bottom: 0;
}

.site-footer .container {
	max-width: 90%;
	margin: 0 auto;
	position: relative;
	overflow: hidden;
	padding-top: 16px;
}

.site-footer .grid-container a {
	color:black;
	text-decoration: none;
	font-size: 15px;
	line-height: 10px;
}

.site-footer .grid-item {
	padding: 10px;
}

.site-footer .grid-container .inner-grid-container {
	display: grid;
	grid-template-columns: auto auto auto auto;
	text-align: left;
}


.button-wrapper {
	display: flex;
	white-space: nowrap;
	width: 90%;
	height: 40%;
}

button {
    background-color:transparent;
	border:none;
	margin-left:-24%;
	font-weight: bold;
	cursor: pointer;
} 

button:hover {
    background: #d3cdcf7c;
    transition: 0.5s;
    border-radius: 0 15px 15px 0px;
}

input {
    border-radius: 15px;
	width:120%;
	font-size: 15px;
	border: 2px solid #bbbbbb;
	text-indent: 15px;
}

p {
	text-align: center;
	color: black;
	background: #bbbbbb;
	font-size: 15px;
	bottom: 0px;
	padding: 20px;

}

#eatsy {
	font-size:30px;
	font-weight:bold;
	letter-spacing: 2px;
}

#subtitle {
	font-weight:bold;
	font-size: 16px;
	line-height: 42px;
	color:black;
}

#subscribe {
	font-weight:bold;
	font-size: 16px;
	line-height: 32px;
	color:black;
}






/*.site-footer .grid-container .grid-item .social-buttons {
	padding-top: 0px;
}

.site-footer .grid-container .grid-item .social-buttons a {
	display: inline-flex;
	text-decoration: none;
	font-size: 30px;
	width: 60px;
	height: 60px;
	color: #1A1F24;
	justify-content: center;
	align-items: center;
	position: relative;
	margin: 0 8px;
}


.site-footer .grid-container .grid-item .social-buttons a i{
	transition: 0.3s ease-in;
}

.site-footer .grid-container .grid-item .social-buttons a:hover i {
	background: linear-gradient(45deg,#A2845C,#A2845C);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	transform: scale(1.5);
}

.circle-icon {
    background: #A2845C;
    padding:12px;
    border-radius: 50%;
}
*/



</style>