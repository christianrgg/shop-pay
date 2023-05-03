import styles from "./style.module.scss"
import {
    EmailShareButton,
    FacebookShareButton,    
    LinkedinShareButton,
    OKShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
  } from "react-share";
  import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    OKIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    WhatsappIcon,
    WorkplaceIcon
  } from "react-share";

export default function Share() {
    return (
        <div className={styles.share}>
        <FacebookShareButton url={window?.location.href}>
            <FacebookIcon size={38}/>
        </FacebookShareButton>

        <WhatsappShareButton url={window?.location.href}>
            <WhatsappIcon size={38}/>
        </WhatsappShareButton>

        <TwitterShareButton url={window?.location.href}>
            <TwitterIcon size={38}/>
        </TwitterShareButton>
        
        <RedditShareButton url={window?.location.href}>
            <RedditIcon size={38}/>
        </RedditShareButton>
        
        <TelegramShareButton url={window?.location.href}>
            <TelegramIcon size={38}/>
        </TelegramShareButton>
        
        <LinkedinShareButton url={window?.location.href}>
            <LinkedinIcon size={38}/>
        </LinkedinShareButton>
        
        <OKShareButton url={window?.location.href}>
            <OKIcon size={38}/>
        </OKShareButton>
        
        <PocketShareButton url={window?.location.href}>
            <PocketIcon size={38}/>
        </PocketShareButton>
        
        <TumblrShareButton url={window?.location.href}>
            <TumblrIcon size={38}/>
        </TumblrShareButton>
        
        <EmailShareButton url={window?.location.href}>
            <EmailIcon size={38}/>
        </EmailShareButton>
    </div>
  )
}
