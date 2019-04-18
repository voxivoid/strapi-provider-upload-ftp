# strapi-provider-upload-ftp

FTP provider for strapi upload

## Instalation

```
npm i strapi-provider-upload-ftp
```

## Base URL
`Base URL` is used to generate the URLs for the files. The file name will be appended to it.

### Example
```
Base URL: http://example.com/
File name: image.jpg

File URL: http://example.com/image.jpg
```

## Duplicate names
When uploading a file, this provider will check if there is already a file with the same name on the server. If the file name already exists it will append a counter to the file name that will be incremented until the name is available.

### Example
```
Files in the server:
  - file.jpg
  - file(1).jpg

File you are trying to upload:
  - file.jpg

The file will be uploaded as file(2).jpg
```


## License

MIT License

Copyright (c) 2019 André Domingues