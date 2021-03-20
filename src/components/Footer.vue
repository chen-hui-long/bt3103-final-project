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
                        As a local directory site consolidating homemade baked goods,<br> Eatsy connects Singapore’s talented home bakers with <br>consumers to support local businesses. 
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
						<span id = "subtitle">Yes! Send me exclusive offers on Eatsy</span>
                        <br>
						<div class = "button-wrapper">
                        <input type="text" placeholder=" Enter your Email" /> 
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
			<hr color = "black">
			<p>Copyright © 2021 | EATSY</p>

		</div>
	</footer>
</template>

<script>
export default {};
</script>

<style scoped>
body {
  font-family: system-ui;
  background: #e3dddf;
  text-align: center;
}


.site-footer {
    margin-top: 50px; /* Remove */
	position: relative;
	background-color:#e3dddf;
	width: 100%;	
	bottom: 0; 
}

.site-footer .container {
	max-width: 85%;
	margin: 0 auto;
	position: relative;
	overflow: hidden;
	padding-top: 5px;
}



.site-footer .grid-container a {
	color:black;
	text-decoration: none;
	font-size: 15px;
	line-height: 16.25px;
}

.site-footer .grid-item {
	padding: 10px;
	color: black;
}


.site-footer .grid-container .inner-grid-container {
	display: grid;
	grid-template-columns: auto auto auto auto;
	text-align: left;
}

.site-footer .container hr { 
	display: block; 
	height: 1px;
	border: 0; border-top: 1px solid #A2845C;
	margin: 1px; 
	padding: 0; 
}


.site-footer .grid-container .grid-item .social-buttons {
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

button {
    background-color:transparent;
	border:none;
	margin-left:-35%;
	font-weight: bold;
}

input {
    border-radius: 20px;
	width:120%;

}

p {
	text-align: center;
	color: black;
}

#eatsy {
	font-size:25px;
	font-weight:bold;
	letter-spacing: 2px;
}

#subtitle {
	font-weight:bold;
}

.button-wrapper {
	display: inline-block;
	white-space: nowrap;
}

</style>