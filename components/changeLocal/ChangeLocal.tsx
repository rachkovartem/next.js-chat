import {Button} from "@mui/material";
import {useRouter} from "next/router";

export const ChangeLocal = (props: any) => {
  const { locale } = props;
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const routerOptionLocale = locale === 'ru' ? 'en' : 'ru';

  return <Button
    sx={{marginRight: 'auto',
      marginLeft: '20px',
      marginTop: '10px',
      background: 'rgba(168,237,234,0)',
      color: '#3b3b3b'}}
    onClick={() => router.push({ pathname, query }, asPath, { locale: routerOptionLocale })}
    variant="contained"
    data-testid="changeLocale"
  >{routerOptionLocale}
  </Button>
}