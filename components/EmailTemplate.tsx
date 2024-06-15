import { Html, Heading, Text, Link, Container, Body, Hr, Head } from "@react-email/components";


const EmailTemplate = ({
  state,
  name,
  author,
  tone,
  man,
  woman,
  lyrics
}: {
  state: string,
  name: string,
  author: string,
  tone: string,
  man: string,
  woman: string,
  lyrics: string
}) => {
  let stat = ""
  if (state === "Actualización") {
    stat = "Actualizado"
  } else if (state = "Creación") {
    stat = "Creado"
  } else {
    stat = ""
  }

  return (
    <Html lang="en">
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading as="h1"><Link style={h1} href="https://canciones-epdlc.vercel.app/song">Canciones EPDLC</Link></Heading>
          <Hr />
          <Text style={h2}>Se ha {stat} la canción {name.toUpperCase()} ✅
          </Text>
          <Text style={text}>
            Canción: {name} - {author} <br />
            Rapida/Lenta: {tone} <br />
            Nota Hombre: {man} <br />
            Nota Mujer: {woman} <br />
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', top: '0', left: '0' }}>Letra:</span>
            <div dangerouslySetInnerHTML={{ __html: lyrics }}/>

            </div>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
export default EmailTemplate;


const main = {
  backgroundColor: "#000000",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "auto",
  padding: "20px 20px 64px",
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "0 0 20px",
};
const h2 = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "0 0 20px",
};

const text = {
  color: "#aaaaaa",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 40px",
};