use avatar::controller::AvatarController;
use actix_web::{web, HttpResponse};

mod avatar;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::resource("/avatar")
        .name("avatar")
        .route(web::post().to(AvatarController::create_avatar))
    );
}