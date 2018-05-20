Accounts.emailTemplates.siteName = "ravisho.com";

Accounts.emailTemplates.from = "راوی شو info@ravisho.com";

Accounts.emailTemplates.verifyEmail.subject = function (user) {
    return "راوی‌شو - فعالسازی حساب کاربری";
};
Accounts.urls.verifyEmail = function (token) {
    return Meteor.absoluteUrl('verify/'+token);
};
Accounts.emailTemplates.resetPassword = {
    subject(user) {
        return "راوی‌شو - بازیابی رمز عبور";
    },
    html(user, url) {
        

        let token = url.substring(url.lastIndexOf('/')+1, url.length);
            url = Meteor.absoluteUrl('reset-password/' + token);
        let email = `
        
        <!DOCTYPE html>
        <html>
        
        <head>
            <title>تغییر رمز عبور</title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <style type="text/css">
                #outlook a {
                    padding: 0;
                }
        
                .ReadMsgBody {
                    width: 100%;
                }
        
                .ExternalClass {
                    width: 100%;
                }
        
                .ExternalClass * {
                    line-height: 100%;
                }
        
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                }
        
                p {
                    display: block;
                    margin: 13px 0;
                }
            </style>
            <!--[if !mso]><!-->
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    @-ms-viewport {
                        width: 320px;
                    }
                    @viewport {
                        width: 320px;
                    }
                }
            </style>
            <!--<![endif]-->
            <!--[if mso]>
            <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <!--[if lte mso 11]>
            <style type="text/css">
            .outlook-group-fix {
                width:100% !important;
            }
            </style>
            <![endif]-->
        
            <!--[if !mso]><!-->
            <link href="https://cdn.rawgit.com/rastikerdar/vazir-font/v18.0.1/dist/font-face.css" rel="stylesheet" type="text/css">
            <style type="text/css">
                @import url(https://cdn.rawgit.com/rastikerdar/vazir-font/v18.0.1/dist/font-face.css);
            </style>
            <!--<![endif]-->
            <style type="text/css">
                @media only screen and (min-width:480px) {
                    .mj-column-per-100,
                    * [aria-labelledby="mj-column-per-100"] {
                        width: 100%!important;
                    }
                }
            </style>
        </head>
        
        <body style="background: #F9F9F9;">
            <div style="background-color:#F9F9F9;">
                <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <style type="text/css">
                    html,
                    body,
                    * {
                        -webkit-text-size-adjust: none;
                        text-size-adjust: none;
                    }
        
                    a {
                        color: #1EB0F4;
                        text-decoration: none;
                    }
        
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
                <div style="margin:0px auto;max-width:640px;background:transparent;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;"
                        align="center" border="0">
                        <tbody>
                            <tr>
                                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;">
                                    <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
                <![endif]-->
                                    <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="word-break:break-word;font-size:0px;padding:0px;" align="center">
                                                        <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;"
                                                            align="center" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width:70px;">
                                                                        <a href="https://ravisho.com/" target="_blank">
                                                                            <img alt="" title="" height="70px" src="https://ravisho.com/images/logo.png"
                                                                                style="border:none;display:block;outline:none;text-decoration:none;width:100%;height:70px;"
                                                                                width="70">
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden">
                    <div style="margin:0px auto;max-width:640px;background:#7289DA url(https://ravisho.com/images/logo.svg) top center / cover no-repeat;">
                        <!--[if mso | IE]>
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:640px;">
                    <v:fill origin="0.5, 0" position="0.5,0" type="tile" src="https://ravisho.com/images/email/bg-email.png" />
                    <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                <![endif]-->
                        <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#7289DA url(https://ravisho.com/images/email/bg-email.png) top center / cover no-repeat;"
                            align="center" border="0" background="https://ravisho.com/images/email/bg-email.png">
                            <tbody>
                                <tr>
                                    <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:57px;">
                                        <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:undefined;width:640px;">
                <![endif]-->
                                        <div style="cursor:auto;color:white;font-family:Vazir, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:36px;font-weight:600;line-height:36px;text-align:center;direction:rtl;">تغییر رمز عبور</div>
                                        <!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!--[if mso | IE]>
                    </v:textbox>
                </v:rect>
                <![endif]-->
                    </div>
                    <!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                    <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                    <div style="margin:0px auto;max-width:640px;background:#ffffff;">
                        <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;"
                            align="center" border="0">
                            <tbody>
                                <tr>
                                    <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 70px;">
                                        <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
                <![endif]-->
                                        <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="word-break:break-word;font-size:0px;padding:0px 0px 20px;" align="left">
                                                            <div style="cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:center;direction:rtl">
                                                                <p>
                                                                    <img src="https://ravisho.com/images/email/reset-password.png" alt="ثبت نام"
                                                                        title="None" width="250" style="height: auto;">
                                                                </p>
        
                                                                <h2 style="font-family: Vazir, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;direction:rtl">سلام،</h2>
                                                                <p>این ایمیل به درخواست شما جهت بازیابی کلمه عبور ارسال شده است. در
                                                                    صورتی که این درخواست توسط شما ثبت نگردیده است میتوانید آن را
                                                                    نادیده بگیرید.</p>
        
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                                                            <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;"
                                                                align="center" border="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="border:none;border-radius:3px;color:white;cursor:auto;padding:15px 19px;"
                                                                            align="center" valign="middle" bgcolor="#7289DA">
                                                                            <a href="${url}" style="text-decoration:none;line-height:100%;background:#7289DA;color:white;font-family:Vazir, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;"
                                                                                target="_blank">
                                                                                بازیابی رمز عبور
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                    <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                </div>
                <div style="margin:0px auto;max-width:640px;background:transparent;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;"
                        align="center" border="0">
                        <tbody>
                            <tr>
                                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;">
                                    <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
                <![endif]-->
                                    <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="word-break:break-word;font-size:0px;">
                                                        <div style="font-size:1px;line-height:12px;">&nbsp;</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="margin:0 auto;max-width:640px;background:#ffffff;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden;">
                    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0">
                        <tbody>
                            <tr>
                                <td style="text-align:center;vertical-align:top;font-size:0px;padding:0px;">
                                    <!--[if mso | IE]>
                <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
                <![endif]-->
                                    <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="word-break:break-word;font-size:0px;padding:30px 70px 0px 70px;" align="center">
                                                        <div style="cursor:auto;color:#43B581;font-family:Vazir, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:18px;font-weight:bold;line-height:16px;text-align:center;direction:rtl"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="word-break:break-word;font-size:0px;padding:14px 70px 30px 70px;" align="center">
                                                        <div style="cursor:auto;color:#737F8D;font-family:Vazir, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:22px;text-align:center;direction:rtl">
                                                            شما داستانی برای گفتن دارید. این یه داستان مخصوصه. این که کی هستید، کجا بودید، الان کجا هستین و چطوری به اینجا رسیدین...
                                                    
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="margin:0px auto;max-width:640px;background:transparent;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;"
                        align="center" border="0">
                        <tbody>
                            <tr>
                                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;">
                                    <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
                <![endif]-->
                                    <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="word-break:break-word;font-size:0px;padding:0px;" align="center">
                                                        <div style="cursor:auto;color:#99AAB5;font-family:Vazir, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
                                                            <a href="https://ravisho.com/" style="color:#1EB0F4;text-decoration:none;" target="_blank">راوی‌ شو</a> •
                                                            <a href="https://twitter.com/ravisho_com" style="color:#1EB0F4;text-decoration:none;"
                                                                target="_blank">@ravisho</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
            </div>
        
        </body>
        
        </html>
        
        
        `;
        
        
        
        
        
        
        return email;
    }
};

Accounts.emailTemplates.verifyEmail.html = function (user, url) {
    let email = `
    <!DOCTYPE html>
    <html>
    
    <head>
        <title>تاییدیه ایمیل</title>
        <!--[if !mso]><!-- -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <style type="text/css">
            #outlook a {
                padding: 0;
            }
    
            .ReadMsgBody {
                width: 100%;
            }
    
            .ExternalClass {
                width: 100%;
            }
    
            .ExternalClass * {
                line-height: 100%;
            }
    
            body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
    
            table,
            td {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
    
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
            }
    
            p {
                display: block;
                margin: 13px 0;
            }
        </style>
        <!--[if !mso]><!-->
        <style type="text/css">
            @media only screen and (max-width:480px) {
                @-ms-viewport {
                    width: 320px;
                }
                @viewport {
                    width: 320px;
                }
            }
        </style>
        <!--<![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!--[if lte mso 11]>
        <style type="text/css">
        .outlook-group-fix {
            width:100% !important;
        }
        </style>
        <![endif]-->
    
        <!--[if !mso]><!-->
        <link href="https://cdn.rawgit.com/rastikerdar/vazir-font/v18.0.1/dist/font-face.css" rel="stylesheet" type="text/css">
        <style type="text/css">
            @import url('https://cdn.rawgit.com/rastikerdar/vazir-font/v18.0.1/dist/font-face.css');
        </style>
        <!--<![endif]-->
        <style type="text/css">
            @media only screen and (min-width:480px) {
                .mj-column-per-100,
                * [aria-labelledby="mj-column-per-100"] {
                    width: 100%!important;
                }
            }
        </style>
    </head>
    
    <body style="background: #F9F9F9;">
        <div style="background-color:#F9F9F9;">
            <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
            <style type="text/css">
                html,
                body,
                * {
                    -webkit-text-size-adjust: none;
                    text-size-adjust: none;
                }
    
                a {
                    color: #1EB0F4;
                    text-decoration: none;
                }
    
                a:hover {
                    text-decoration: underline;
                }
            </style>
            <div style="margin:0px auto;max-width:640px;background:transparent;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center"
                    border="0">
                    <tbody>
                        <tr>
                            <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;">
                                <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
            <![endif]-->
                                <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tbody>
                                            <tr>
                                                <td style="word-break:break-word;font-size:0px;padding:0px;" align="center">
                                                    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center"
                                                        border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td style="width:70px;">
                                                                    <a href="https://ravisho.com/" target="_blank">
                                                                        <img alt="" title="" height="70px" src="https://ravisho.com/images/logo.png" style="border:none;display:block;outline:none;text-decoration:none;width:100%;height:70px;"
                                                                            width="70">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
            <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
            <div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden">
                <div style="margin:0px auto;max-width:640px;background:#7289DA url(https://ravisho.com/images/logo.png) top center / cover no-repeat;">
                    <!--[if mso | IE]>
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:640px;">
                <v:fill origin="0.5, 0" position="0.5,0" type="tile" src="https://ravisho.com/images/logo.png" />
                <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
            <![endif]-->
                    <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#7289DA url(https://ravisho.com/images/email/bg-email.png) top center / cover no-repeat;"
                        align="center" border="0" background="https://ravisho.com/images/email/bg-email.png">
                        <tbody>
                            <tr>
                                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:57px;">
                                    <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:undefined;width:640px;">
            <![endif]-->
                                    <div style="cursor:auto;color:white;font-family:Vazir, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:36px;font-weight:600;line-height:36px;text-align:center;direction:rtl;">به راوی‌شو خوش آمدید.</div>
                                    <!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!--[if mso | IE]>
                </v:textbox>
            </v:rect>
            <![endif]-->
                </div>
                <!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
                <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
                <div style="margin:0px auto;max-width:640px;background:#ffffff;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center"
                        border="0">
                        <tbody>
                            <tr>
                                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 70px;">
                                    <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
            <![endif]-->
                                    <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="word-break:break-word;font-size:0px;padding:0px 0px 20px;" align="left">
                                                        <div style="cursor:auto;color:#585858;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:right;direction:rtl">
                                                            <p style="text-align: center">
                                                                <img src="https://ravisho.com/images/email/register-email.png" alt="ثبت ایمیل" width="250" style="height: auto;">
                                                            </p>
    
                                                            <h2 style="font-family: Vazir, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;direction:rtl">سلام،</h2>
                                                            <p>خیلی خوشحالیم از اینکه راوی دیگری به خانواده راوی شو پیوست. داستان‌های
                                                                خودتون رو در راوی شو به اشتراک بذارید تا ما و بقیه از خوندن اون‌ها
                                                                لذت ببریم.</p>
                                                            <p>قبل از اینکه بتونین داستان خود را بنویسید، نیاز به تایید ایمیل خود
                                                                دارید
                                                            </p>
    
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                                                        <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="border:none;border-radius:3px;color:white;cursor:auto;padding:15px 19px;" align="center" valign="middle" bgcolor="#7289DA">
                                                                        <a href="${url.replace(" #/verify-email ",'verify')}" style="text-decoration:none;line-height:100%;background:#7289DA;color:white;font-family:Vazir, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;"
                                                                            target="_blank">
                                                                            تایید ایمیل
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
                <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
            </div>
            <div style="margin:0px auto;max-width:640px;background:transparent;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center"
                    border="0">
                    <tbody>
                        <tr>
                            <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;">
                                <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
            <![endif]-->
                                <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tbody>
                                            <tr>
                                                <td style="word-break:break-word;font-size:0px;">
                                                    <div style="font-size:1px;line-height:12px;">&nbsp;</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
            <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
            <div style="margin:0 auto;max-width:640px;background:#ffffff;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden;">
                <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0">
                    <tbody>
                        <tr>
                            <td style="text-align:center;vertical-align:top;font-size:0px;padding:0px;">
                                <!--[if mso | IE]>
            <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
            <![endif]-->
                                <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tbody>
                                            <tr>
                                                <td style="word-break:break-word;font-size:0px;padding:30px 70px 0px 70px;" align="center">
                                                    <div style="cursor:auto;color:#43B581;font-family:Vazir,sans-serif;font-size:18px;font-weight:bold;line-height:16px;text-align:center;direction:rtl"></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="word-break:break-word;font-size:0px;padding:14px 70px 30px 70px;" align="center">
                                                    <div style="cursor:auto;color:#585858;font-family:Vazir, sans-serif;font-size:16px;line-height:22px;text-align:center;direction:rtl">
                                                        شما داستانی برای گفتن دارید. این یه داستان مخصوصه. این که کی هستید، کجا بودید، الان کجا هستین و چطوری به اینجا رسیدین...
                                                    
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
            <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
            <div style="margin:0px auto;max-width:640px;background:transparent;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center"
                    border="0">
                    <tbody>
                        <tr>
                            <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;">
                                <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
            <![endif]-->
                                <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tbody>
                                            <tr>
                                                <td style="word-break:break-word;font-size:0px;padding:0px;" align="center">
                                                    <div style="cursor:auto;color:#99AAB5;font-family:Vazir, sans-serif;font-size:12px;line-height:24px;text-align:center;">
                                                        <a href="https://ravisho.com/" style="color:#1EB0F4;text-decoration:none;" target="_blank">راوی ‌شو</a> •
                                                        <a href="https://twitter.com/ravisho_com" style="color:#1EB0F4;text-decoration:none;" target="_blank">@ravisho</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]>
            </td></tr></table>
            <![endif]-->
        </div>
    
    </body>
    
    </html>
    
    `;
    
    
    
    
    
    
    return email;
};