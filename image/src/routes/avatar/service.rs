use actix_web::{HttpRequest, HttpResponse, error};

pub struct AvatarService {
    
}

impl AvatarService {
    pub async fn create(req: HttpRequest) -> HttpResponse {
        HttpResponse::Ok().json("Hello, world!")
    }
}
