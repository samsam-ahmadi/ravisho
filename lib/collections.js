import moment from 'moment-jalaali'

Stories = new Meteor.Collection("stories");
Tags = new Meteor.Collection("tags");

var createThumbProfile = function (fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('100', '100').quality(70).stream().pipe(writeStream);
};
var createThumbStories = function (fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('600').quality(70).stream().pipe(writeStream);
};
var createStories = function (fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).quality(70).stream().pipe(writeStream);
};
Images = new FS.Collection("images", {
  stores: [
    new FS.Store.FileSystem("images", { transformWrite: createStories, path: "/opt/ravishoImages/stories" }),
    new FS.Store.FileSystem("thumbs", { transformWrite: createThumbStories, path: "/opt/ravishoImages/stories/thumbs" }),
  ],

  filter: {
    allow: {
      maxSize: 2500000,      
      contentTypes: ['image/*']
    }
  }
});
ProfileImages = new FS.Collection("profileImages", {
  // stores: [new FS.Store.FileSystem("images", {transformWrite: createThumb,path: "~/uploads"})],
  stores: [new FS.Store.FileSystem("profileImages", { transformWrite: createThumbProfile, path: "/opt/ravishoImages/profile" })],
  filter: {
    allow: {
      maxSize: 2500000,
      contentTypes: ['image/*']
    }
  }
});



Stories.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "عنوان داستان",
    max: 200
  },
  category_stories: {
    type: String,
    label: "دسته بندی خود ",
    allowedValues: [
      'خانواده',
      'روزمرگی',
      'کودکانه',
      'ترسناک',
      'مسافرت',
      'طنز',
      'کسب و کار',
      'سبک زندگی',
      'زندگی نامه و خاطرات',
      'سایر'
    ],
    autoform: {
      afFormGroup: {
        label: false,
      },
      afFieldInput: {
        type: "select",
        firstOption: 'دسته بندی',
      },
      options: [
        {
          label: 'خانواده',
          value: 'خانواده',
        },
        {
          label: 'روزمرگی',
          value: 'روزمرگی',
        },
        {
          label: 'کودکانه',
          value: 'کودکانه',
        },
        {
          label: 'ترسناک',
          value: 'ترسناک',
        },
        {
          label: 'مسافرت',
          value: 'مسافرت',
        },
        {
          label: 'طنز',
          value: 'طنز',
        },
        {
          label: 'کسب و کار',
          value: 'کسب و کار',
        },
        {
          label: 'سبک زندگی',
          value: 'سبک زندگی',
        },
        {
          label: 'زندگی نامه و خاطرات',
          value: 'زندگی نامه و خاطرات',
        },
        {
          label: 'سایر',
          value: 'سایر',
        },

      ]

    }
  },
  tags: {
    type: Array,
    label: "تگ های داستان",    
    autoform: {
      type:'text',      
      afFormGroup: {
        label: 'تگ‌های خود را با علامت # از هم جدا کنید.'
      }
    }
  },
  'tags.$':{
    type: String
  },
  created_by: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "hidden"
      },
      afFormGroup: {
        label: false
      }
    },
    autoValue: function () {
      if (this.isInsert && (!this.isSet || this.value.length === 0)) {
        return Meteor.userId();
      }
    }
  },
  //show in manager page when user fixed content problem or create new story
  show_manager: {
    type: Boolean,
    optional: true,
    defaultValue: true,
    autoform: {
      afFieldInput: {
        type: "hidden"
      },
      afFormGroup: {
        label: false
      }
    },
  },
  unknown: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      afFieldInput: {
        class: "filled-in"
      }
    },
    label: 'به صورت ناشناس منتشر شود؟'
  },
  draft: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      afFieldInput: {
        class: "filled-in"
      }
    },
    label: 'ذخیره در پیش‌نویس'
  },
  count_likes: {
    type: Number,
    defaultValue: 0,
    optional: true,
    min: 0,
    autoform: {
      afFieldInput: {
        type: "hidden"
      },
      afFormGroup: {
        label: false
      }
    },
  },
  likes: {
    type: Array,
    optional: true,
  },
  'likes.$': {
    type: Object
  },
  'likes.$.userId': {
    type: String
  },
  'likes.$.NumberLikes': {
    type: Number,
    decimal: true,
    min: 0,
    max: 6,
  },
  best_stories: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      afFieldInput: {
        class: "filled-in"
      }
    },
    label: 'ذخیره در پیش‌نویس'
  },
  published: {
    type: Boolean,
    optional: true,
    defaultValue: false,
    autoform: {
      afFieldInput: {
        type: "hidden"
      },
      afFormGroup: {
        label: false
      }
    },
  },
  created_at: {
    type: Date,
    optional: true,
    autoform: {
      value: new Date(),
      afFieldInput: {
        type: "hidden"
      },
      afFormGroup: {
        label: false
      }
    }

  },
  content_problems: {
    type: String,
    label: "مشکلات داستان",
    optional: true,    
    defaultValue:'',
    autoform: {
      afFieldInput: {
        type: "hidden"
      },
      afFormGroup: {
        label: false
      }
    }
  },
  pictures: {
    type: String,
    label: "تصویر ",
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        accept: 'image/*',
        lable: 'عکس خود را انتخاب کنید.',
        selectFileBtnTemplate: 'afFileSelectFileBtnTemplateFixed',
        removeFileBtnTemplate: 'afFileRemoveFileBtnTemplateFixed',
      },
      afFormGroup: {
        label: false
      }
    }

  },
  stories: {
    type: String,
    label: "داستان",
    min: 150,
    autoform: {
      afFieldInput: {
        type: 'summernote',
        class: 'editor', // optional
      }
    },
    autoValue: function () {
      if (this.isInsert) {
        if (Meteor.isServer) {
          return sanitizeHtml(this.value);
        } else {
          return this.value;
        }
      } else if (this.isUpdating) {
        if (Meteor.isServer) {
          return sanitizeHtml(this.value);
        } else {
          return this.value;
        }
      }
    },
  }

}));



Tags.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "عنوان تگ",
    max: 20
  },
  uses: {
    type: Number,
    defaultValue: 1,
    optional: true,
    min: 0
  },
  click: {
    type: Number,
    defaultValue: 1,
    optional: true,
    min: 0
  },
  id_stories: {
    type: Array,
    optional: true
  },
  'id_stories.$': {
    type: String
  }
}));



SimpleSchema.messages({
  required: "[label] را وارد کنید",
  minString: "[label] باید حداقل از  [min] کارکتر باشید",
  maxString: "[label] حداکثر  کارکتر [max]",
  minNumber: "[label] must be at least [min]",
  maxNumber: "[label] cannot exceed [max]",
  minDate: "[label] must be on or after [min]",
  maxDate: "[label] حداکثر مقدار [max]",
  badDate: "[label] تاریخ صحیح نمیباشد",
  minCount: "You must specify at least [minCount] values",
  maxCount: "You cannot specify more than [maxCount] values",
  noDecimal: "[label] باید به صورت اینتیجر باشید",
  notAllowed: "[value] مقدار صحیحی وارد نشده است",
  expectedString: "[label] باید به صورت رشته باشد",
  expectedNumber: "[label] باید به صورت عدد باشد",
  expectedBoolean: "[label] باید یک مقدار boolean باشد",
  expectedArray: "[label] باید ارایه باشد",
  expectedObject: "[label] باید یک ابجکت باشد",
  expectedConstructor: "[label] باید از نوع  [type]",
  regEx: [
    { msg: "[label] failed regular expression validation" },
    { exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address" },
    { exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address" },
    { exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain" },
    { exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain" },
    { exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address" },
    { exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address" },
    { exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address" },
    { exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL" },
    { exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID" }
  ],
  keyNotInSchema: "[key] is not allowed by the schema"
});
