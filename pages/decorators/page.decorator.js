import React, { Fragment, Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export class Page extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if(hasError) {
      return (
        <div>
          <h1>Something is going wrong.</h1>
          <Link href="/">
            <a>Go back to main page</a>
          </Link>
        </div>
      );
    }

    return (
      <Fragment>
        <Head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>React CDP App</title>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.0.10/css/all.css"
                integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg"
                crossorigin="anonymous" />
          <script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js"
                  integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+"
                  crossOrigin="anonymous"></script>
        </Head>
          {children}
        <footer>
          <Link href="/">
            <a>netflixroilette</a>
          </Link>

          <a href='https://github.com/vladislavkovaliov/react-cdp-for-mentees'>github</a>
        </footer>
      </Fragment>
    );
  }
}
