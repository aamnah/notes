module.exports = {
  siteMetadata: {
    siteUrl: `https://blog.aamnah.com`, // No trailing slash allowed!
    title: `Aamnah - Frontend developer`,
    description: `Life of Aamnah, in blog version`,
    author: `@aamnahakram`,
    github_url: `https://github.com/aamnah/blog.aamnah.com`,
    instagram_username: 'aamnahakram',
    behance_username: 'aamnah',
    github_username: 'aamnah',
    post_edit_url: `https://github.com/aamnah/blog.aamnah.com/tree/master/src/content`,
  },
  plugins: [
    `gatsby-plugin-feed-mdx`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
        // path: path.join(__dirname, `src`, `images`),
      },
    },

    // Google Analytics
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-10347872-4',
      },
    },

    // MDX page options
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve(`./src/components/Layout/Default.jsx`), // require.resolve give us the absolute path name
          blog: require.resolve(`./src/components/Layout/Post.jsx`),
          notes: require.resolve(`./src/components/Layout/Post.jsx`),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },

    /* 
    Commented manifest plugin below as the tool i used to create custom icons gave me the manifest file as well
    https://realfavicongenerator.net/
    */
    // Favicon and Manifest file
    // https://web.dev/add-manifest/
    // https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Aamnah - Frontend developer`,
        short_name: `Aamnah.com`,
        // description: this.siteMetadata.description,
        // start_url: `/`, // tells the browser where your application should start when it is launched, and prevents the app from starting on whatever page the user was on when they added your app to their home screen.
        lang: `en`,
        background_color: `#13B2A9`, // used on the splash screen when the application is first launched on mobile, originally #76ced3
        theme_color: `#13B2A9`, // sets the color of the tool bar, should match the meta theme color specified in your document head.
        display: `standalone`,
        cache_busting_mode: 'none', // Updating cache_busting_mode is necessary. Otherwise, workbox will break while attempting to find the cached URLs.
        theme_color_in_head: false, // This will avoid adding theme-color meta tag.

        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          // 192px and 512px icons is sufficient for most cases, but you can provide additional icons for pixel perfection.
          // Add or remove icon sizes as desired
        ],
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['**/*'], // Adding the globPatterns makes sure that the offline plugin will cache everything. hint: favicon
        },
      },
    },

    // You can have multiple instances of `gatsby-source-filesystem` plugin
    // to read source nodes from different locations on your
    // filesystem.
    //
    // The following sets up the Jekyll pattern of having a
    // "pages" directory for Markdown files and a "data" directory
    // for `.json`, `.yaml`, `.csv`.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `data`,
    //     path: `${__dirname}/src/data`,
    //     ignore: [`**/\.*`], // ignore files starting with a dot
    //   },
    // },
  ],
}
