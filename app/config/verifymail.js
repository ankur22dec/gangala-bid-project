const config = require("config");

module.exports = (verifyLink) => {
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
        :root{--blue:#007bff;--indigo:#6610f2;--purple:#6f42c1;--pink:#e83e8c;--red:#dc3545;--orange:#fd7e14;--yellow:#ffc107;--green:#28a745;--teal:#20c997;--cyan:#17a2b8;--white:#fff;--gray:#6c757d;--gray-dark:#343a40;--primary:#007bff;--secondary:#6c757d;--success:#28a745;--info:#17a2b8;--warning:#ffc107;--danger:#dc3545;--light:#f8f9fa;--dark:#343a40;--breakpoint-xs:0;--breakpoint-sm:576px;--breakpoint-md:768px;--breakpoint-lg:992px;--breakpoint-xl:1200px;--font-family-sans-serif:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--font-family-monospace:SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;}
        *,::after,::before{box-sizing:border-box;}
        html{font-family:sans-serif;line-height:1.15;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-ms-overflow-style:scrollbar;-webkit-tap-highlight-color:transparent;}
        body{margin:0;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:1rem;font-weight:400;line-height:1.5;color:#212529;text-align:left;background-color:#fff;}
        hr{box-sizing:content-box;height:0;overflow:visible;}
        h1{margin-top:0;margin-bottom:.5rem;}
        p{margin-top:0;margin-bottom:1rem;}
        a{color:#007bff;text-decoration:none;background-color:transparent;-webkit-text-decoration-skip:objects;}
        a:hover{color:#0056b3;text-decoration:underline;}
        a:not([href]):not([tabindex]){color:inherit;text-decoration:none;}
        a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none;}
        a:not([href]):not([tabindex]):focus{outline:0;}
        img{vertical-align:middle;border-style:none;}
        h1{margin-bottom:.5rem;font-family:inherit;font-weight:500;line-height:1.2;color:inherit;}
        h1{font-size:2.5rem;}
        .display-4{font-size:3.5rem;font-weight:300;line-height:1.2;}
        hr{margin-top:1rem;margin-bottom:1rem;border:0;border-top:1px solid rgba(0, 0, 0, .1);}
        .small{font-size:80%;font-weight:400;}
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
        .btn{display:inline-block;font-weight:400;text-align:center;white-space:nowrap;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;}
        .btn:focus,.btn:hover{text-decoration:none;}
        .btn:focus{outline:0;box-shadow:0 0 0 .2rem rgba(0, 123, 255, .25);}
        .btn:disabled{opacity:.65;}
        .btn-lg{padding:.5rem 1rem;font-size:1.25rem;line-height:1.5;border-radius:.3rem;}
        .d-flex{display:-webkit-box!important;display:-ms-flexbox!important;display:flex!important;}
        .justify-content-center{-webkit-box-pack:center!important;-ms-flex-pack:center!important;justify-content:center!important;}
        .align-items-center{-webkit-box-align:center!important;-ms-flex-align:center!important;align-items:center!important;}
        .text-center{text-align:center!important;}
        @media print{
        *,::after,::before{text-shadow:none!important;box-shadow:none!important;}
        a:not(.btn){text-decoration:underline;}
        img{page-break-inside:avoid;}
        p{orphans:3;widows:3;}
        body{min-width:992px!important;}
        .container{min-width:992px!important;}
        }
        .small{color:gray!important;}
        .follow-icon-facebook{width:60px!important;}
        .follow-icon-instagram{width:40px!important;}
        .nadaasi-icon{width:90px;}
        :root{--blue:#007bff;--indigo:#6610f2;--purple:#6f42c1;--pink:#e83e8c;--red:#dc3545;--orange:#fd7e14;--yellow:#ffc107;--green:#28a745;--teal:#20c997;--cyan:#17a2b8;--white:#fff;--gray:#6c757d;--gray-dark:#343a40;--primary:#007bff;--secondary:#6c757d;--success:#28a745;--info:#17a2b8;--warning:#ffc107;--danger:#dc3545;--light:#f8f9fa;--dark:#343a40;--breakpoint-xs:0;--breakpoint-sm:576px;--breakpoint-md:768px;--breakpoint-lg:992px;--breakpoint-xl:1200px;--font-family-sans-serif:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--font-family-monospace:SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;}
        *,::after,::before{box-sizing:border-box;}
        html{font-family:sans-serif;line-height:1.15;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-ms-overflow-style:scrollbar;-webkit-tap-highlight-color:transparent;}
        body{margin:0;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:1rem;font-weight:400;line-height:1.5;color:#212529;text-align:left;background-color:#fff;}
        hr{box-sizing:content-box;height:0;overflow:visible;}
        h1{margin-top:0;margin-bottom:.5rem;}
        p{margin-top:0;margin-bottom:1rem;}
        a{color:#007bff;text-decoration:none;background-color:transparent;-webkit-text-decoration-skip:objects;}
        a:hover{color:#0056b3;text-decoration:underline;}
        a:not([href]):not([tabindex]){color:inherit;text-decoration:none;}
        a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none;}
        a:not([href]):not([tabindex]):focus{outline:0;}
        img{vertical-align:middle;border-style:none;}
        h1{margin-bottom:.5rem;font-family:inherit;font-weight:500;line-height:1.2;color:inherit;}
        h1{font-size:2.5rem;}
        .display-4{font-size:3.5rem;font-weight:300;line-height:1.2;}
        hr{margin-top:1rem;margin-bottom:1rem;border:0;border-top:1px solid rgba(0, 0, 0, .1);}
        .small{font-size:80%;font-weight:400;}
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
        .btn{display:inline-block;font-weight:400;text-align:center;white-space:nowrap;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;}
        .btn:focus,.btn:hover{text-decoration:none;}
        .btn:focus{outline:0;box-shadow:0 0 0 .2rem rgba(0, 123, 255, .25);}
        .btn:disabled{opacity:.65;}
        .btn-lg{padding:.5rem 1rem;font-size:1.25rem;line-height:1.5;border-radius:.3rem;}
        .d-flex{display:-webkit-box!important;display:-ms-flexbox!important;display:flex!important;}
        .justify-content-center{-webkit-box-pack:center!important;-ms-flex-pack:center!important;justify-content:center!important;}
        .align-items-center{-webkit-box-align:center!important;-ms-flex-align:center!important;align-items:center!important;}
        @media print{
        *,::after,::before{text-shadow:none!important;box-shadow:none!important;}
        a:not(.btn){text-decoration:underline;}
        img{page-break-inside:avoid;}
        p{orphans:3;widows:3;}
        body{min-width:992px!important;}
        .container{min-width:992px!important;}
        }
        .small{color:gray!important;}
        .follow-icon-facebook{width:33px!important;}
        .follow-icon-instagram{width:40px!important;}
        .nadaasi-icon{width:90px;}
        .small{color:gray!important;}
        .follow-icon-facebook{width:33px!important;}
        .follow-icon-instagram{width:40px!important;}
        .nadaasi-icon{width:90px;}
        </style>
    </head>
    
    <body>
        <h1 style="font-size: 2.6rem; font-weight: bold;color: black;" class="display-4 text-center">Verify Your Email</h1>
        <div class="d-flex justify-content-center align-items-center">
            <div class="col-10">
                <hr>
            </div>
        </div>
        <p class="text-center small">Please verify your email to secure your account</p>
    
    
    
        <div style="display: table; margin: auto; margin-bottom: 20px;">
            <a href='${verifyLink}' class="text-center btn btn-lg "
                style="background-color: black;display: table-cell; text-align: center;  color: white; border-radius: 0; font-size: 1rem; font-weight: 300;">
                VERIFY NOW
            </a>
        </div>
    
    
    
        <p class="text-center small">Or paste this link in your browser</p>
        <d class="flex justify-content-center align-items-center">
            <div class="text-center">
                <a href="${verifyLink}">${verifyLink}</a>
            </div>
        </d>
        <div class="d-flex justify-content-center align-items-center">
            <div class="col-10">
                <hr>
            </div>
        </div>
        <p class="small text-center">
            If this wasn’t you, please click <a href="${
              verifyLink + "delete"
            }">here</a>
        </p>
        <p class="small text-center">
            To learn more about our Bonus, click <a href="${
              config.get("client") + "/invite"
            }">here</a>.
        </p>
    
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
    
    
    
    </body>
    
    </html>`;
};
