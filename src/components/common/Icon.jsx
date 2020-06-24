import React from 'react'

// getIconSvg is only used within this file, to define the SVG code for different icon names, and to pass props to the SVG code
const getIconSvg = (name, props) => {
  const {
    fill = '#202938', // var(--color-dark)
    // height = '100%',
    // width = '100%',
    className = 'SvgIcon',
    ...rest
  } = props

  // const { fill } = props

  switch (name) {
    case 'heart':
      return `<svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <path d="M83.6549 21.8671C81.6343 19.8454 79.2352 18.2416 76.5946 17.1474C73.954 16.0532 71.1237 15.49 68.2654 15.49C65.4071 15.49 62.5768 16.0532 59.9362 17.1474C57.2956 18.2416 54.8965 19.8454 52.8759 21.8671L50.2343 24.4974L47.5814 21.8501C45.5864 19.7278 43.1852 18.028 40.5206 16.8517C37.8559 15.6754 34.982 15.0466 32.0696 15.0025C29.1572 14.9584 26.2656 15.5 23.5665 16.5952C20.8675 17.6903 18.4161 19.3167 16.3578 21.3776C14.2995 23.4386 12.6763 25.8922 11.5846 28.5926C10.493 31.2931 9.95509 34.1854 10.0029 37.0977C10.0508 40.0101 10.6833 42.8832 11.8631 45.5463C13.0429 48.2094 14.7457 50.6084 16.8706 52.6006L48.9902 84.7202C49.3194 85.0319 49.7555 85.2056 50.2088 85.2056C50.6621 85.2056 51.0981 85.0319 51.4273 84.7202L83.6208 52.6517C87.6997 48.5675 89.9936 43.0331 90 37.2608C90.0064 31.4886 87.7247 25.9491 83.6549 21.8558V21.8671Z" fill="${fill}"/>
      </svg>`

    case 'external-link':
      return `<svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M75.7883 18L46.564 47.2243C44.8485 48.9398 44.846 51.7283 46.5643 53.4466C48.2791 55.1614 51.0684 55.165 52.7865 53.4469L82 24.2334V34.0032C82 36.2059 83.7909 38 86 38C88.2046 38 90 36.2106 90 34.0032V13.9968C90 12.896 89.5527 11.8972 88.8295 11.1734C88.1051 10.4484 87.1063 10 86.0032 10H65.9968C63.7941 10 62 11.7909 62 14C62 16.2046 63.7894 18 65.9968 18H75.7883ZM90 58V38.9851V80.0297C90 85.5361 86.0328 90 81.1329 90H18.8671C13.9699 90 10 85.5274 10 80.0297V19.9703C10 14.4639 13.9672 10 18.8671 10H61.5665H42C44.2091 10 46 11.7909 46 14C46 16.2091 44.2091 18 42 18H20.2778C19.0053 18 18 19.1947 18 20.6685V79.3315C18 80.7787 19.0198 82 20.2778 82H79.7222C80.9947 82 82 80.8053 82 79.3315V58C82 55.7909 83.7909 54 86 54C88.2091 54 90 55.7909 90 58Z" fill="${fill}"/>
      </svg>`

    case 'external-link2':
      return `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M75.7883 18L46.564 47.2243C44.8485 48.9398 44.846 51.7283 46.5643 53.4466C48.2791 55.1614 51.0684 55.165 52.7865 53.4469L82 24.2334V34.0032C82 36.2059 83.7909 38 86 38C88.2046 38 90 36.2106 90 34.0032V13.9968C90 12.896 89.5527 11.8972 88.8295 11.1734C88.1051 10.4484 87.1063 10 86.0032 10H65.9968C63.7941 10 62 11.7909 62 14C62 16.2046 63.7894 18 65.9968 18H75.7883ZM90 58V38.9851V80.0297C90 85.5361 86.0328 90 81.1329 90H18.8671C13.9699 90 10 85.5274 10 80.0297V19.9703C10 14.4639 13.9672 10 18.8671 10H61.5665H42C44.2091 10 46 11.7909 46 14C46 16.2091 44.2091 18 42 18H20.2778C19.0053 18 18 19.1947 18 20.6685V79.3315C18 80.7787 19.0198 82 20.2778 82H79.7222C80.9947 82 82 80.8053 82 79.3315V58C82 55.7909 83.7909 54 86 54C88.2091 54 90 55.7909 90 58Z" fill="${fill}"/>
        `
    case 'plane':
      return `<svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.1934 50.5134C9.16382 52.152 9.28951 54.5518 12.4657 55.8476L21.8766 59.6862C25.0555 60.9874 29.8657 60.2774 32.5601 58.1097L73.427 24.8845C76.1136 22.706 76.4017 23.0272 74.0686 25.6025L41.7615 61.2519C39.4206 63.8191 40.1119 66.9721 43.3012 68.2436L44.4036 68.6863C47.5929 69.9578 52.7907 72.0931 55.959 73.4212L66.3964 77.8025C69.5674 79.1306 72.9557 77.5649 73.8565 74.1636L89.7639 13.884C90.662 10.4827 88.9181 9.03847 85.8885 10.6744L12.1934 50.5134Z" fill="${fill}"/>
      <path d="M38.0205 89.9774C37.8346 90.5524 44.4568 80.0919 44.4568 80.0919C46.329 77.144 45.2659 73.6266 42.1027 72.2931L34.8809 69.2453C31.7178 67.9118 30.2016 69.4775 31.5109 72.7358C31.5109 72.7358 38.2116 89.3862 38.0205 89.9774Z" fill="${fill}"/>
      </svg>`
    default:
      return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="${fill}"/></svg>`
  }
}

// only viewBox will make it reponsive, will take up entire screen, even if the value is '0 0 32 32'
// viewBox '0 0 32 32' with height and width 100% will make the SVG take up all 'available space'. so if it's in a 64px container, the SVG will be 64px
// if height and width have fixed values, say 32px, the SVG will remain that size instead of taking up entire space = non-responsive
// viewBox value does not have to match the height/width value. they don't have to be the same
// height & width = viewport
// viewport is like pan
// viewBox is like zoom

// SvgIcon can take props from the user when the component is used
export function SvgIcon({
  name = '',
  fill = 'var(--color-muted)', // var(--color-dark)
  height = 32,
  width = 32,
  size = 32,
  className,
  ...rest
}) {
  return (
    // to change icon size, i don't need to change the viewbox, just width and height
    <svg
      fill={fill}
      width={size ? size : width}
      height={size ? size : height}
      className={`${className} SvgIcon SvgIcon-${name}`}
      // viewBox={getViewBox(name)}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {getIconSvg(name, fill)}
    </svg>
    // getIconSvg(name, fill)
  )
}

// https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91
