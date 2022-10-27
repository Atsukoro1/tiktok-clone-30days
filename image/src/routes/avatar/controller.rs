use actix_web::{HttpRequest, HttpResponse, web};
use super::service::AvatarService;

pub struct AvatarController {}

impl AvatarController {
    pub async fn create_avatar(
        &self, 
        req: HttpRequest, 
        payload: web::Payload
    ) -> HttpResponse {
        AvatarService::create(req, payload).await
    }
}