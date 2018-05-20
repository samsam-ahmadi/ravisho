Meteor.methods({
  //submit story
  submitStory: function (data) {
    check(data,
      {
        _id: Match.Optional(String),
        category_stories: Match.Optional(String),
        tags: Match.Optional(Array),
        content_problems: Match.Optional(String),
        title: Match.Optional(String),
        pictures: Match.Optional(String),
        created_by: Match.Optional(String),
        unknown: Match.Optional(Boolean),
      }
    )

    if (Roles.userIsInRole(this.userId, ['admin', 'management'])) {
      try {
        let tagsArr = data.tags;
        //added tagts to tags collections
        console.log("test2");

        for (let i = 0; i < tagsArr.length; i++) {
          if (Tags.find({ name: tagsArr[i] }).count() > 0) {
            //check if idstory is exist just update count_tag
            if (Tags.find({ id_stories: data._id }).count() > 0) {
              // Tags.update({name:tagsArr[i]},{$inc:{count_tag:1}})
            } else {
              //else update count tags and push idstory to collections              
              Tags.update({ name: tagsArr[i] }, { $inc: { uses: 1 }, $push: { id_stories: data._id } })
            }

          } else {
            //if dosnt exist tags in collection insert that
            Tags.insert({ name: tagsArr[i], id_stories: [data._id] })
          }
        }
        try {
          let result = Stories.update({ _id: data._id }, { $set: { published: true, show_manager: false, best_stories: false, content_problems: "" } })
          if (result) {
            Meteor.users.update({ _id: data.created_by }, { $set: { countStories: Stories.find({ "created_by": data.created_by, published: true }).count() } })
            return result;
          } else {
            return result;
          }
        } catch (error) {
          return error
        }
      } catch (e) {
        return e;
      }
    } else {
      throw new Meteor.Error("دسترسی امکان پذیر نیست :))");
    }
  },
  submitBestStory: function (data) {


    console.log('data: ', data);
    delete data.unknown;
    check(data,
      {
        _id: Match.Optional(String),
        category_stories: Match.Optional(String),
        tags: Match.Optional(Array),
        content_problems: Match.Optional(String),
        title: Match.Optional(String),
        pictures: Match.Optional(String),
        created_by: Match.Optional(String),
      }
    )
    if (Roles.userIsInRole(this.userId, ['admin', 'management'])) {
      try {
        let tagsArr = data.tags;
        //added tagts to tags collections
        for (let i = 0; i < tagsArr.length; i++) {
          if (Tags.find({ name: tagsArr[i] }).count() > 0) {
            //check if idstory is exist just update count_tag
            if (Tags.find({ id_stories: data._id }).count() > 0) {
              // Tags.update({name:tagsArr[i]},{$inc:{uses:1}})
            } else {
              //else update count tags and push idstory to collections
              Tags.update({ name: tagsArr[i] }, { $inc: { uses: 1 }, $push: { id_stories: data._id } })
            }

          } else {
            //if dosnt exist tags in collection insert that
            Tags.insert({ name: tagsArr[i], id_stories: [data._id] })
          }
        }
        // and finaly update story for published

        let result = Stories.update({ _id: data._id }, { $set: { published: true, show_manager: false, best_stories: true, content_problems: '' } })
        if (result) {
          console.log('data.created_by: ', data.created_by);
          console.log("test", Stories.find({ "created_by": data.created_by, published: true }).count());
          Meteor.users.update({ _id: data.created_by }, { $set: { countStories: Stories.find({ "created_by": data.created_by, published: true }).count() } })
          return result;
        } else {
          return result;
        }
      } catch (e) {
        return e;
      }
    } else {
      throw new Meteor.Error("دسترسی امکان پذیر نیست :))")
    }
  },
  submitCurrectedStory: function (data) {
    let story = Stories.findOne({ "_id": data._id });
    let userEmail = Meteor.users.findOne({ "_id": story.created_by }).emails[0].address;
    if (Roles.userIsInRole(this.userId, ['admin', 'management'])) {
      try {
        // and finaly update story for published

        Email.send({
          to: userEmail,
          from: "info@ravisho.com" + "راوی شو -اصلاحیه داستان",
          subject: "راوی شو اصلاحیه داستان",
          html: `
    <!DOCTYPE html>
    <html>
    
    <head>
        <title>اصلاحیه داستان</title>
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
    
                                                            <h2 style="font-family: Vazir, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;direction:rtl">سلام،</h2>
                                                            <p>نویسنده گرامی داستان شما با عنوان ${story.title} قبل از منتشر شدن نیازمند ویرایش است.</p>
                                                            <p>شما می‌توانید با انتخاب گزینه ویرایش pencil2 در داستان خود، به راحتی موارد زیر را تغییر دهید:</p>
                                                            <p>لیست تغییرات: </p>
                                                            <p> ${data.content_problems}</p>
    
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
    `,
        });

        return Stories.update({ _id: data._id }, { $set: { content_problems: data.txtcorrected, show_manager: false } })
      } catch (e) {
        return e;
      }
    } else {
      throw new Meteor.Error("دسترسی امکان پذیر نیست :))")
    }
  }
});
