
"""update_studio_settings_schema

Revision ID: 92451cde88f5
Revises: 8136cde779f4
Create Date: 2026-02-09 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '92451cde88f5'
down_revision: Union[str, Sequence[str], None] = '8136cde779f4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Drop old columns (careful in prod, but ok for dev as requested to match new schema)
    # Or just alter them.
    # The new schema has: full_name, mobile_number, email_id, country, state, city,
    # company_name, industry, area, avg_events_per_year, billing_company_name, gst_vat_number, profile_picture_url
    
    # Existing columns: full_name, email, phone, job_title, company_name, website_url, business_address, profile_picture_url
    
    # Rename email -> email_id
    op.alter_column('studio_settings', 'email', new_column_name='email_id', existing_type=sa.String(), nullable=True)
    
    # Rename phone -> mobile_number
    op.alter_column('studio_settings', 'phone', new_column_name='mobile_number', existing_type=sa.String(), nullable=True)
    
    # Add new columns
    op.add_column('studio_settings', sa.Column('country', sa.String(), nullable=True))
    op.add_column('studio_settings', sa.Column('state', sa.String(), nullable=True))
    op.add_column('studio_settings', sa.Column('city', sa.String(), nullable=True))
    op.add_column('studio_settings', sa.Column('industry', sa.String(), nullable=True))
    op.add_column('studio_settings', sa.Column('area', sa.String(), nullable=True))
    op.add_column('studio_settings', sa.Column('avg_events_per_year', sa.String(), nullable=True))
    op.add_column('studio_settings', sa.Column('billing_company_name', sa.String(), nullable=True))
    op.add_column('studio_settings', sa.Column('gst_vat_number', sa.String(), nullable=True))
    
    # Drop obsolete columns
    with op.batch_alter_table('studio_settings') as batch_op:
        batch_op.drop_column('job_title')
        batch_op.drop_column('website_url')
        batch_op.drop_column('business_address')
        
    # Make full_name and company_name nullable as per new model
    op.alter_column('studio_settings', 'full_name', existing_type=sa.String(), nullable=True)
    op.alter_column('studio_settings', 'company_name', existing_type=sa.String(), nullable=True)


def downgrade() -> None:
    # Revert changes
    op.alter_column('studio_settings', 'email_id', new_column_name='email', existing_type=sa.String(), nullable=False)
    op.alter_column('studio_settings', 'mobile_number', new_column_name='phone', existing_type=sa.String(), nullable=True)
    
    op.add_column('studio_settings', sa.Column('job_title', sa.String(), nullable=True))
    op.add_column('studio_settings', sa.Column('website_url', sa.String(), nullable=True))
    op.add_column('studio_settings', sa.Column('business_address', sa.Text(), nullable=True))
    
    with op.batch_alter_table('studio_settings') as batch_op:
        batch_op.drop_column('country')
        batch_op.drop_column('state')
        batch_op.drop_column('city')
        batch_op.drop_column('industry')
        batch_op.drop_column('area')
        batch_op.drop_column('avg_events_per_year')
        batch_op.drop_column('billing_company_name')
        batch_op.drop_column('gst_vat_number')
        
    op.alter_column('studio_settings', 'full_name', existing_type=sa.String(), nullable=False)
    op.alter_column('studio_settings', 'company_name', existing_type=sa.String(), nullable=False)
