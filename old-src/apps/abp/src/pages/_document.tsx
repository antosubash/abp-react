import { getCookie } from 'cookies-next';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext
} from 'next/document';
class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return initialProps;
    }

    render() {
        return (
            <Html lang="en" data-theme="dark">
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap"
                    rel="stylesheet"
                />
                <Head>
                    <script
                        async
                        defer
						data-website-id="63635f6b-c68a-4724-8be3-154d1b221ef8"
						src="https://umami.antosubash.com/script.js"
                    ></script>
                </Head>
                <body className="bg-base-100  text-base-content">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
