"""merge multiple heads

Revision ID: fa8b6af0774b
Revises: 3e49ebdc940b, 92451cde88f5
Create Date: 2026-02-10 13:26:36.183186

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fa8b6af0774b'
down_revision: Union[str, Sequence[str], None] = ('3e49ebdc940b', '92451cde88f5')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
