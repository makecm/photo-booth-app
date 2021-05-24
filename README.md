# PDF Certificate Maker (App)

<img src="https://raw.githubusercontent.com/makecm/photo-booth-app/main/public/og-image.png">

<br/>

This repo is a simple boilerplate to allow you to create your own photo booth image generator with React, Cloudinary and [Make.cm](https://make.cm)

- **App** (you're here)

Check it out [here](https://photo-booth.make.cm/)

If you want to learn how I built this, read the guide [here](https://make.cm/blog/make-a-photo-booth).

## Getting started

This app runs [create react app](https://create-react-app.dev/docs/getting-started) under the hood, so any CRA command will work here.

```
yarn
```

```
yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technology

- [axios](https://www.npmjs.com/package/axios): Handle http POST request
- Cloudinary
  - [Upload API](https://cloudinary.com/documentation/upload_images#unsigned_upload): Publicly host our image for generation
  - [Transformations API](https://cloudinary.com/documentation/transformation_reference): Transform our image to fit to our template
- [Make API](https://docs.make.cm/api-reference/make-api): Generate a custom photo booth image from our template
- [react-device-detect](https://www.npmjs.com/package/react-device-detect): Allows us to change our download behaviors depending on the device
