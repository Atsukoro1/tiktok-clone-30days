use actix_web::{HttpRequest, HttpResponse};
use super::service::AvatarService;

pub struct AvatarController {}

impl AvatarController {
    pub async fn create_avatar(&self, req: HttpRequest) -> HttpResponse {
        AvatarService::create(req).await
    }
}