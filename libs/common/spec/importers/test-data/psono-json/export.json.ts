import { PsonoJsonExport } from "@bitwarden/common/importers/psono/psono-json-types";

export const testData: PsonoJsonExport = {
  folders: [
    {
      name: "TestFolder",
      items: [
        {
          type: "website_password",
          name: "TestEntry",
          autosubmit: true,
          urlfilter: "filter",
          website_password_title: "TestEntry",
          website_password_url: "bitwarden.com",
          website_password_username: "testUser",
          website_password_password: "testPassword",
          website_password_notes: "some notes",
          website_password_auto_submit: true,
          website_password_url_filter: "filter",
          create_date: "2022-12-13T19:24:09.810266Z",
          write_date: "2022-12-13T19:24:09.810292Z",
          callback_url: "callback",
          callback_user: "callbackUser",
          callback_pass: "callbackPassword",
        },
      ],
    },
  ],
  items: [
    // {
    //   type: "website_password",
    //   name: "My TestEnty not in folder",
    //   autosubmit: true,
    //   urlfilter: "filter",
    //   website_password_title: "My TestEnty not in folder",
    //   website_password_url: "bitwarden.com",
    //   website_password_username: "testUser",
    //   website_password_password: "testPassword",
    //   website_password_notes: "some notes",
    //   website_password_auto_submit: true,
    //   website_password_url_filter: "filter",
    //   create_date: "2022-12-13T19:36:34.078740Z",
    //   write_date: "2022-12-13T19:36:49.210369Z",
    //   callback_url: "callback",
    //   callback_user: "callbackUser",
    //   callback_pass: "callbackPassword",
    // },
    // {
    //   type: "bookmark",
    //   name: "MyBookmark",
    //   urlfilter: "bitwarden.com",
    //   bookmark_title: "MyBookmark",
    //   bookmark_url: "https://bitwarden.com",
    //   bookmark_notes: "my notes for bitwarden.com",
    //   bookmark_url_filter: "bitwarden.com",
    //   create_date: "2022-12-13T19:39:26.631530Z",
    //   write_date: "2022-12-13T19:39:26.631553Z",
    //   callback_url: "",
    //   callback_user: "",
    //   callback_pass: "",
    // },
    // {
    //   type: "mail_gpg_own_key",
    //   name: "my test gpg key",
    //   mail_gpg_own_key_title: "my test gpg key",
    //   mail_gpg_own_key_email: "djsmith.bitwarden@gmail.com",
    //   mail_gpg_own_key_name: "My name",
    //   mail_gpg_own_key_public:
    //     "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\n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\nAZTY\n=kfi8\n-----END PGP PUBLIC KEY BLOCK-----\n",
    //   mail_gpg_own_key_private:
    //     "-----BEGIN PGP PRIVATE KEY BLOCK-----\n\n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\nEiIRI+xLdLnqAbrpmRsb9kIBlNg=\n=+NhB\n-----END PGP PRIVATE KEY BLOCK-----\n",
    //   create_date: "2022-12-13T19:40:16.070379Z",
    //   write_date: "2022-12-13T19:40:16.070404Z",
    //   callback_url: "",
    //   callback_user: "",
    //   callback_pass: "",
    // },
    // {
    //   type: "environment_variables",
    //   name: "My Environment Variables",
    //   environment_variables_title: "My Environment Variables",
    //   environment_variables_variables: [
    //     { key: "Key1", value: "Value1" },
    //     { key: "Key2", value: "Value2" },
    //   ],
    //   environment_variables_notes: "Notes for environment variables",
    //   create_date: "2022-12-13T19:41:02.028884Z",
    //   write_date: "2022-12-13T19:41:02.028909Z",
    //   callback_url: "",
    //   callback_user: "",
    //   callback_pass: "",
    // },
    // {
    //   type: "note",
    //   name: "My Note",
    //   note_title: "My Note",
    //   note_notes: "Notes for my Note",
    //   create_date: "2022-12-13T19:41:18.770714Z",
    //   write_date: "2022-12-13T19:41:18.770738Z",
    //   callback_url: "",
    //   callback_user: "",
    //   callback_pass: "",
    // },
    // {
    //   type: "totp",
    //   name: "My TOTP",
    //   totp_title: "My TOTP",
    //   totp_period: 30,
    //   totp_algorithm: "SHA1",
    //   totp_digits: 6,
    //   totp_code: "someSecretofmine",
    //   totp_notes: "Notes for TOTP",
    //   create_date: "2022-12-13T19:41:42.972586Z",
    //   write_date: "2022-12-13T19:41:42.972609Z",
    //   callback_url: "",
    //   callback_user: "",
    //   callback_pass: "",
    // },
    // {
    //   type: "application_password",
    //   name: "My App Password",
    //   application_password_title: "My App Password",
    //   application_password_username: "someUser",
    //   application_password_password: "somePassword",
    //   application_password_notes: "some notes for the APP",
    //   create_date: "2022-12-13T19:42:05.784077Z",
    //   write_date: "2022-12-13T19:42:05.784103Z",
    //   callback_url: "",
    //   callback_user: "",
    //   callback_pass: "",
    // },
  ],
};
