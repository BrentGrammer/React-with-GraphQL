import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

// url will be required to have reset?token={token}
export default function ResetPage({ query }) {
  if (!query?.token)
    return (
      <div>
        <p>Must supply a token in the url.</p>
        <RequestReset />
      </div>
    );
  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
}
