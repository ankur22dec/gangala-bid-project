const config = require("config");

module.exports = (order) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <title>
            template
        </title>
        <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" -->
        <!-- integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> -->
        <style>
           /*! CSS Used from: Embedded */
    *,::after,::before{box-sizing:border-box;}
    body{margin:0;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:1rem;font-weight:400;line-height:1.5;color:#212529;text-align:left;background-color:#fff;}
    hr{box-sizing:content-box;height:0;overflow:visible;}
    h2{margin-top:0;margin-bottom:.5rem;}
    a{color:#007bff;text-decoration:none;background-color:transparent;-webkit-text-decoration-skip:objects;}
    a:hover{color:#0056b3;text-decoration:underline;}
    h2{margin-bottom:.5rem;font-family:inherit;font-weight:500;line-height:1.2;color:inherit;}
    h2{font-size:2rem;}
    hr{margin-top:1rem;margin-bottom:1rem;border:0;border-top:1px solid rgba(0, 0, 0, .1);}
    .row{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px;}
    .col-1,.col-10,.col-md-12,.col-md-5,.col-md-7,.col-md-8{position:relative;width:100%;min-height:1px;padding-right:15px;padding-left:15px;}
    .col-1{-webkit-box-flex:0;-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%;}
    .col-10{-webkit-box-flex:0;-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%;}
    @media (min-width:768px){
    .col-md-5{-webkit-box-flex:0;-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%;}
    .col-md-7{-webkit-box-flex:0;-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%;}
    .col-md-8{-webkit-box-flex:0;-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%;}
    .col-md-12{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%;}
    }
    .list-group-item{position:relative;display:block;padding:.75rem 1.25rem;margin-bottom:-1px;background-color:#fff;border:1px solid rgba(0, 0, 0, .125);}
    .list-group-item:last-child{margin-bottom:0;border-bottom-right-radius:.25rem;border-bottom-left-radius:.25rem;}
    .list-group-item:focus,.list-group-item:hover{z-index:1;text-decoration:none;}
    .list-group-item:disabled{color:#6c757d;background-color:#fff;}
    .border-bottom{border-bottom:1px solid #dee2e6!important;}
    .d-flex{display:-webkit-box!important;display:-ms-flexbox!important;display:flex!important;}
    .justify-content-center{-webkit-box-pack:center!important;-ms-flex-pack:center!important;justify-content:center!important;}
    .justify-content-between{-webkit-box-pack:justify!important;-ms-flex-pack:justify!important;justify-content:space-between!important;}
    .align-items-center{-webkit-box-align:center!important;-ms-flex-align:center!important;align-items:center!important;}
    .mr-2{margin-right:.5rem!important;}
    .mb-2{margin-bottom:.5rem!important;}
    .mb-3{margin-bottom:1rem!important;}
    .py-2{padding-top:.5rem!important;}
    .py-2{padding-bottom:.5rem!important;}
    .py-3{padding-top:1rem!important;}
    .py-3{padding-bottom:1rem!important;}
    .text-center{text-align:center!important;}
    .text-muted{color:#6c757d!important;}
    @media print{
    *,::after,::before{text-shadow:none!important;box-shadow:none!important;}
    a:not(.btn){text-decoration:underline;}
    h2{orphans:3;widows:3;}
    h2{page-break-after:avoid;}
    body{min-width:992px!important;}
    }
    *,::after,::before{box-sizing:border-box;}
    .row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px;}
    .col-md-5,.col-md-7{position:relative;width:100%;padding-right:15px;padding-left:15px;}
    @media (min-width:768px){
    .col-md-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%;}
    .col-md-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%;}
    }
    .border-bottom{border-bottom:1px solid #dee2e6!important;}
    .shadow-sm{box-shadow:0 .125rem .25rem rgba(0, 0, 0, .075)!important;}
    .mr-2{margin-right:.5rem!important;}
    .py-2{padding-top:.5rem!important;}
    .py-2{padding-bottom:.5rem!important;}
    .text-muted{color:#6c757d!important;}
    @media print{
    *,::after,::before{text-shadow:none!important;box-shadow:none!important;}
    }
    @media screen and (max-width: 768px){
    div.row-wrap>.row{flex-wrap:nowrap;}
    }
    *{padding:0;margin:0;}
    .custom-rounded{border-radius:2px;padding:0.8rem 0.9rem;}
    *,::after,::before{box-sizing:border-box;}
    body{margin:0;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:1rem;font-weight:400;line-height:1.5;color:#212529;text-align:left;background-color:#fff;}
    hr{box-sizing:content-box;height:0;overflow:visible;}
    a{color:#007bff;text-decoration:none;background-color:transparent;-webkit-text-decoration-skip:objects;}
    a:hover{color:#0056b3;text-decoration:underline;}
    img{vertical-align:middle;border-style:none;}
    hr{margin-top:1rem;margin-bottom:1rem;border:0;border-top:1px solid rgba(0, 0, 0, .1);}
    .container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto;}
    @media (min-width:576px){
    .container{max-width:540px;}
    }
    @media (min-width:768px){
    .container{max-width:720px;}
    }
    @media (min-width:992px){
    .container{max-width:960px;}
    }
    @media (min-width:1200px){
    .container{max-width:1140px;}
    }
    .row{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px;}
    .col-10,.col-3,.col-4,.col-5{position:relative;width:100%;min-height:1px;padding-right:15px;padding-left:15px;}
    .col-3{-webkit-box-flex:0;-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%;}
    .col-4{-webkit-box-flex:0;-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%;}
    .col-5{-webkit-box-flex:0;-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%;}
    .col-10{-webkit-box-flex:0;-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%;}
    .d-flex{display:-webkit-box!important;display:-ms-flexbox!important;display:flex!important;}
    .justify-content-center{-webkit-box-pack:center!important;-ms-flex-pack:center!important;justify-content:center!important;}
    .align-items-center{-webkit-box-align:center!important;-ms-flex-align:center!important;align-items:center!important;}
    .text-center{text-align:center!important;}
    @media print{
    *,::after,::before{text-shadow:none!important;box-shadow:none!important;}
    a:not(.btn){text-decoration:underline;}
    img{page-break-inside:avoid;}
    body{min-width:992px!important;}
    .container{min-width:992px!important;}
    }
    .follow-icon-facebook{width:60px!important;}
    .follow-icon-instagram{width:40px!important;}
    .nadaasi-icon{width:90px;}
    *,::after,::before{box-sizing:border-box;}
    body{margin:0;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:1rem;font-weight:400;line-height:1.5;color:#212529;text-align:left;background-color:#fff;}
    hr{box-sizing:content-box;height:0;overflow:visible;}
    a{color:#007bff;text-decoration:none;background-color:transparent;-webkit-text-decoration-skip:objects;}
    a:hover{color:#0056b3;text-decoration:underline;}
    img{vertical-align:middle;border-style:none;}
    hr{margin-top:1rem;margin-bottom:1rem;border:0;border-top:1px solid rgba(0, 0, 0, .1);}
    .container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto;}
    @media (min-width:576px){
    .container{max-width:540px;}
    }
    @media (min-width:768px){
    .container{max-width:720px;}
    }
    @media (min-width:992px){
    .container{max-width:960px;}
    }
    @media (min-width:1200px){
    .container{max-width:1140px;}
    }
    .col-10{position:relative;width:100%;min-height:1px;padding-right:15px;padding-left:15px;}
    .col-10{-webkit-box-flex:0;-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%;}
    .d-flex{display:-webkit-box!important;display:-ms-flexbox!important;display:flex!important;}
    .justify-content-center{-webkit-box-pack:center!important;-ms-flex-pack:center!important;justify-content:center!important;}
    .align-items-center{-webkit-box-align:center!important;-ms-flex-align:center!important;align-items:center!important;}
    @media print{
    *,::after,::before{text-shadow:none!important;box-shadow:none!important;}
    a:not(.btn){text-decoration:underline;}
    img{page-break-inside:avoid;}
    body{min-width:992px!important;}
    .container{min-width:992px!important;}
    }
    .follow-icon-facebook{width:33px!important;}
    .follow-icon-instagram{width:40px!important;}
    .nadaasi-icon{width:90px;}
    .follow-icon-facebook{width:33px!important;}
    .follow-icon-instagram{width:40px!important;}
    .nadaasi-icon{width:90px;}
        </style>
    </head>
    
    <body>
        <!-- <h1 style="font-size: 2.6rem; font-weight: bold;" class="display-4 text-center">CONGRATULATIONS FOR PLACING AN ORDER</h1> -->
        <div class="background">
            
    
    
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10">
                <h2 style="font-size: 2rem; font-weight: 400;color:black;" class=" ">Order Detail</h2>
                    <div class="d-flex list-group-item py-3 
        justify-content-between  
        shadow-sm  mb-2">
                        <div class="col-md-12 row-wrap mb-3">
                        <div class="row py-2 text-muted border-bottom">
                        <div class="col-md-5">Order Country</div>
                        <div class="col-md-7">${order.country.name}</div>
                    </div>
                    <div class="row py-2 text-muted border-bottom">
                                <div class="col-md-5">Ordered On</div>
                                <div class="col-md-7">${new Date().toDateString()}</div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
    
    
    
    
            </div>
            <div class="row">
                <div class="col-1"></div>
    
                <div class="col-10">
                    <h2 style="font-size: 2rem; font-weight: 400;color:black;" class=" ">Info</h2>
                     <div class="d-flex list-group-item py-3 
                    justify-content-between  
                    shadow-sm  mb-2">
                                        <div class="col-md-12 row-wrap mb-3">
                                            <div class="row py-2 text-muted border-bottom">
                                                <div class="col-md-5">Name</div>
                                                <div class="col-md-7">${
                                                  order.firstname
                                                }${` `}${order.lastname}</div>
                                            </div>
                                            
                                            <div class="row py-2 text-muted border-bottom">
                                                <div class="col-md-12">Thanks For Ordering our product Please Contact at <b>info@nadaasi.com</b> If you find any Mistake in Product</div>
                                            </div> 

                                        </div>
                                    </div>
                </div>
            </div>
    
    
            <br>
            <br>
            <div class="container row">
            <div class="col-3">
               
            </div>
            <div class="col-5 text-center">

            </div>
            <div class="col-4 ">
                <div style="display: table; margin-left: auto;">
            


                            <a href="http://nadaasi.com">
                                <img class='nadaasi-icon' src="http://nadassi-api.herokuapp.com/uploads/logo.png" alt="faccebok">
                            </a>
                </div>

            </div>
        </div>
        
        <div class="container row" style="margin-top: 10px;">
            <div class="col-3">
               
            </div>
            <div class="col-5 text-center">

            </div>
            <div class="col-4 ">
                <div style="display: table;  margin-left: auto;">
                    <p style="display: table-cell; margin-right: 20px; padding-right: 20px;" class="">Follow Us</p>
                    <a style="display: table-cell;" href="https://www.facebook.com/nadaasidresses/"><img
                            class='follow-icon-facebook' src="http://nadassi-api.herokuapp.com/uploads/facebook.png"
                            alt="faccebok"></a>


                    <a style="display: table-cell;" href="https://www.instagram.com/nadaasidresses/">
                        <img class='follow-icon-instagram' src="http://nadassi-api.herokuapp.com/uploads/instagram.png"
                            alt="faccebok">
                    </a>
                </div>

            </div>
        </div>
    </div>
    
    
    
    
    
    
    </body>
    
    </html>`;
};
