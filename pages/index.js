import Head from 'next/head';
import { withApollo } from '../apollo/client';
import { GlobalProvider } from '../apollo/GlobalState';
import Header from '../components/Header';
import SidePanel from '../components/SidePanel';
import ListView from '../components/ListView';

const Index = () => (
  < div >
    <Head>
      <title>Element101</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <GlobalProvider>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <SidePanel />
            <ListView />
          </div>
        </div>
      </GlobalProvider>
    </main>

  </div >
)

export default withApollo(Index)