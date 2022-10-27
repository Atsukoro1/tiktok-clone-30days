use actix_web::{HttpRequest, HttpResponse, error, web};

pub struct AvatarService {
    
}

impl AvatarService {
    pub async fn create(req: HttpRequest, payload: web::Payload) -> HttpResponse {
        HttpResponse::Ok().json("Hello, world!")
    }
}
