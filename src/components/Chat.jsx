import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Chat = ({ pvs,sendMSG,Joiningchat,messages,removeMsg }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const confirmUser = async (token) => {
    const res = await fetch("http://localhost:4003/api/auth/me", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (res.status == 200) {
      const user = await res.json();
      console.log(user);
      setUser({...user})
    } else {
      navigate("/auth");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      confirmUser(token);
    } else {
      navigate("/auth");
    }
  }, []);
  const massageHandler=(event)=>{
      event.preventDefault()
      sendMSG(message,user.username,receiver)
      setMessage('')
  }
  return (
    <main className="main">
      <section className="costom-row">
        <div className="costom-col-3">
          <section className="sidebar">
            <div className="sidebar__header">
              <div className="sidebar__menu">
                <i className="sidebar__menu-icon animated-menu-icon"></i>
              </div>
              <div className="sidebar__searchbar">
                <input
                  type="text"
                  className="sidebar__searchbar-input"
                  placeholder="Search"
                />
                <i className="sidebar__searchbar-icon fa fa-search"></i>
              </div>
            </div>
            <div className="sidebar__categories">
              <ul className="sidebar__categories-list">
                <li
                  className="sidebar__categories-item sidebar__categories-item--active"
                  data-category-name="all"
                >
                  <span className="sidebar__categories-text">Pvs</span>
                  {/* <span className="sidebar__categories-counter sidebar__counter">3</span> */}
                </li>
              </ul>
            </div>
            <div className="sidebar__contact data-category-all sidebar__contact--active">
              <ul className="sidebar__contact-list">
                {pvs.map((pv) => {
                    if (pv.username !==user.username) {
                        return(
                            <li onClick={()=>{
                                setReceiver(pv.username)
                                Joiningchat(user.username,pv.username)
            
                              }} className="sidebar__contact-item">
                                <a className="sidebar__contact-link" href="#">
                                  <div className="sidebar__contact-left">
                                    <div className="sidebar__contact-left-left">
                                      <img
                                        className="sidebar__contact-avatar"
                                        src="public/images/profiles/1.jpeg"
                                      />
                                    </div>
                                    <div className="sidebar__contact-left-right">
                                      <span className="sidebar__contact-title">
                                        {pv.username}
                                      </span>
                                      <div className="sidebar__contact-sender">
                                        <span className="sidebar__contact-sender-name">
                                          Qadir Yolme :
                                        </span>
                                        <span className="sidebar__contact-sender-text">
                                          سلام داداش خوبی؟
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="sidebar__contact-right">
                                    <span className="sidebar__contact-clock">15.53</span>
                                    <span className="sidebar__contact-counter sidebar__counter sidebar__counter-active">
                                      66
                                    </span>
                                  </div>
                                </a>
                              </li>
                        )
                    }
                
})}
              </ul>
            </div>
        
          </section>
          <button className="sidebar-bottom-btn btn-circle rp btn-corner z-depth-1 btn-menu-toggle">
            <span className="tgico animated-button-icon-icon animated-button-icon-icon-first">
              
            </span>
          </button>
        </div>
        <div className="costom-col-9 container-hide">
          <section className="chat">
            <div className={`chat__header ${receiver && 'chat__header--active'}`}>
              <div className="chat__header-left">
                <button className="btn-icon sidebar-close-button">
                  <span className="tgico button-icon"></span>
                  <span className="badge badge-20 badge-primary is-badge-empty back-unread-badge"></span>
                </button>
                <div className="chat__header-left-left">
                  <img
                    className="chat__header-avatar"
                    src="public/images/avatar.jpg"
                  />
                </div>
                <div className="chat__header-left-right">
                  <span className="chat__header-name">{receiver}</span>
                  <span className="chat__header-status">
                    last seen recently
                  </span>
                </div>
              </div>
              <div className="chat__header-right">
                <div className="chat__header-search icon-phone">
                  <span className="tgico button-icon chat__header-phone-icon"></span>
                </div>
                <div className="chat__header-search">
                  <i className="chat__header-search-icon fa fa-search"></i>
                </div>
                <div className="chat__header-menu">
                  <i className="chat__header-menu-icon fa fa-ellipsis-v"></i>
                </div>
              </div>
            </div>
            <div className={`chat__content ${receiver && 'chat__content--active'}`}>
              <div className="chat__content-date">
                <span className="chat__content-date-text"> Today </span>
              </div>
              <div className="chat__content-main">
                
               
               {messages.map(item=>{
                  if (item.pv.sender===user.username) {
                      return(
                        
                        <div
                        key={item.msgID}
                        id={`msg-${item.msgID}`}
                        className="chat__content-receiver-wrapper chat__content-wrapper"
                      >
                        <div className="chat__content-receiver">
                          <span className="chat__content-receiver-text">
                            {item.message}
                          </span>
                          <span className="chat__content-chat-clock">
                            17:55
                            <i
                              className="fa fa-trash"
                              onClick={() =>  removeMsg(item.msgID)}
                            ></i>
                          </span>
                        </div>
                      </div>
                      )
                  }else{
                  return(
                    <div
                    id={`msg-${item.msgID}`}
                    className="chat__content-sender-wrapper chat__content-wrapper"
                  >
                    <div className="chat__content-sender">
                      <span className="chat__content-sender-text">
                        {item.message}
                      </span>
                      <span className="chat__content-chat-clock">
                        17:55
                      </span>
                    </div>
                  </div>
                  )
                  }
               })}
              </div>
              <div className="chat__content-bottom-bar">
                <div className="chat__content-bottom-bar-left">
                    <form onSubmit={massageHandler}>
                  <input
                  value={message}
                  onChange={(event)=>setMessage(event.target.value)}
                    className="chat__content-bottom-bar-input"
                    placeholder="Message"
                    type="text"
                  />
                  <i className="chat__content-bottom-bar-icon-left tgico button-icon laugh-icon"></i>
                  <i className="chat__content-bottom-bar-icon-right tgico button-icon file-icon"></i>
             
                  </form>   </div>
                <div className="chat__content-bottom-bar-right">
                  <i className="chat__content-bottom-bar-right-icon fa fa-microphone"></i>
                </div>
                <div className="chat__content-bottom-bar-right">
                  <span
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      top: "-37px",
                      fontSize: "2.4rem",
                      visibility: "hidden",
                      opacity: "0",
                    }}
                    className="chat__content-bottom-bar-right-icon tgico button-icon arrow-bottom-icon__active"
                  >
                    
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <div className="contact-menu context-menu">
        {/* <ul className="contact-menu__list context-menu__list">
              <li className="contact-menu__item context-menu__item">
                  <i className="contact-menu__icon context-menu__icon fa fa-trash"></i>
                  <span className="contact-menu__text context-menu__text">Open in new salam</span>
              </li>
          
              <li className="contact-menu__item context-menu__item">
                  <i className="contact-menu__icon context-menu__icon fa fa-trash"></i>
                  <span className="contact-menu__text context-menu__text">Open in new tab</span>
              </li>
          
              <li className="contact-menu__item context-menu__item">
                  <i className="contact-menu__icon context-menu__icon fa fa-trash"></i>
                  <span className="contact-menu__text context-menu__text">Open in new tab</span>
              </li>
          
              <li className="contact-menu__item context-menu__item">
                  <i className="contact-menu__icon context-menu__icon fa fa-trash"></i>
                  <span className="contact-menu__text context-menu__text">Open in new tab</span>
              </li>
          
              <li className="contact-menu__item context-menu__item">
                  <i className="contact-menu__icon context-menu__icon fa fa-trash"></i>
                  <span className="contact-menu__text context-menu__text">Open in new tab</span>
              </li>
          
              <li className="contact-menu__item context-menu__item context-menu__item-delete">
                  <i className="contact-menu__icon context-menu__icon fa fa-trash"></i>
                  <span className="contact-menu__text context-menu__text">Open in new tab</span>
              </li>
          
      </ul> */}
      </div>

      <div className="chat-menu context-menu">
        <div className="contact-menu__list context-menu__list">
          <div className="contact-menu__item context-menu__item">
            <span className="tgico btn-menu-item-icon"></span>
            <span className="contact-menu__text context-menu__text">Reply</span>
          </div>
          <div className="contact-menu__item context-menu__item">
            <span className="contact-menu__icon context-menu__icon tgico btn-menu-item-icon">
              
            </span>
            <span className="contact-menu__text context-menu__text">Copy</span>
          </div>
          <div className="contact-menu__item context-menu__item">
            <span className="contact-menu__icon context-menu__icon tgico btn-menu-item-icon">
              
            </span>
            <span className="contact-menu__text context-menu__text">
              Translate
            </span>
          </div>
          <div className="contact-menu__item context-menu__item">
            <span className="contact-menu__icon context-menu__icon tgico btn-menu-item-icon">
              
            </span>
            <span className="contact-menu__text context-menu__text">Pin</span>
          </div>
          <div className="contact-menu__item context-menu__item">
            <span className="contact-menu__icon context-menu__icon tgico btn-menu-item-icon">
              
            </span>
            <span className="contact-menu__text context-menu__text">
              Forward
            </span>
          </div>
          <div className="contact-menu__item context-menu__item">
            <span className="contact-menu__icon context-menu__icon tgico btn-menu-item-icon">
              
            </span>
            <span className="contact-menu__text context-menu__text">
              Select
            </span>
          </div>
          <div className="contact-menu__item context-menu__item danger">
            <span className="contact-menu__icon context-menu__icon tgico btn-menu-item-icon">
              
            </span>
            <span className="contact-menu__text context-menu__text">
              Delete
            </span>
          </div>
        </div>
      </div>

      <div className="setting-menu">
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Saved Messages
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Archived Chats
          </span>
          <span
            style={{ flex: "1", textAlign: "right", opacity: "0.7" }}
            className="badge badge-24 badge-gray archived-count"
          >
            6
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            My Stories
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Contacts
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Settings
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Dark Mode
          </span>
          <label className="checkbox-field checkbox-without-caption checkbox-field-toggle">
            <input className="checkbox-field-input" type="checkbox" />
            <div className="checkbox-toggle">
              <div className="checkbox-toggle-circle"></div>
            </div>
          </label>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Animations
          </span>
          <label className="checkbox-field checkbox-without-caption checkbox-field-toggle">
            <input className="checkbox-field-input" type="checkbox" />
            <div className="checkbox-toggle">
              <div className="checkbox-toggle-circle"></div>
            </div>
          </label>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Telegram Features
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Report Bug
          </span>
        </div>
        <div className="contact-menu__item context-menu__item a">
          <span className="tgico btn-menu-item-icon">A</span>
          <span className="contact-menu__text context-menu__text">
            Switch to A version
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Install App
          </span>
        </div>
        <a
          href="https://github.com/morethanwords/tweb/blob/master/CHANGELOG.md"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-menu-footer"
        >
          <span className="btn-menu-footer-text">
            Telegram WebK 2.1.0 (509)
          </span>
        </a>
      </div>
    </main>
  );
};

export default Chat;
