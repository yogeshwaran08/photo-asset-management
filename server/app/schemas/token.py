from typing import Optional
from pydantic import BaseModel

class Token(BaseModel):
    accessToken: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    type: Optional[str] = None
