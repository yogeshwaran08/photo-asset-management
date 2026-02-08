"""add file_size to photos

Revision ID: 8136cde779f4
Revises: 7025bcd668e3
Create Date: 2026-02-08 23:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8136cde779f4'
down_revision: Union[str, Sequence[str], None] = '7025bcd668e3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('photos', sa.Column('file_size', sa.Integer(), nullable=True, server_default='0'))


def downgrade() -> None:
    with op.batch_alter_table('photos') as batch_op:
        batch_op.drop_column('file_size')
