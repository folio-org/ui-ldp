const ldpTablesResponse = Promise.resolve({ json: () => Promise.resolve([{
  'tableName' : 'circulation_cancellation_reasons',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-circulation-storage',
  'rowCount' : '4'
}, {
  'tableName' : 'circulation_fixed_due_date_schedules',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-circulation-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'circulation_loan_policies',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-circulation-storage',
  'rowCount' : '2'
}, {
  'tableName' : 'circulation_loans',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-circulation-storage',
  'rowCount' : '5'
}, {
  'tableName' : 'circulation_loan_history',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-circulation-storage',
  'rowCount' : '5'
}, {
  'tableName' : 'circulation_patron_action_sessions',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-circulation-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'circulation_patron_notice_policies',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-circulation-storage',
  'rowCount' : '1'
}, {
  'tableName' : 'circulation_request_policies',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-circulation-storage',
  'rowCount' : '2'
}, {
  'tableName' : 'circulation_request_preference',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-circulation-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'circulation_requests',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-circulation-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'circulation_scheduled_notices',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-circulation-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'circulation_staff_slips',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-circulation-storage',
  'rowCount' : '4'
}, {
  'tableName' : 'configuration_entries',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-configuration',
  'rowCount' : '3'
}, {
  'tableName' : 'email_email',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-email',
  'rowCount' : '0'
}, {
  'tableName' : 'feesfines_accounts',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-feesfines',
  'rowCount' : '0'
}, {
  'tableName' : 'feesfines_comments',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-feesfines',
  'rowCount' : '0'
}, {
  'tableName' : 'feesfines_feefines',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-feesfines',
  'rowCount' : '5'
}, {
  'tableName' : 'feesfines_feefineactions',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-feesfines',
  'rowCount' : '0'
}, {
  'tableName' : 'feesfines_lost_item_fees_policies',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-feesfines',
  'rowCount' : '1'
}, {
  'tableName' : 'feesfines_manualblocks',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-feesfines',
  'rowCount' : '0'
}, {
  'tableName' : 'feesfines_overdue_fines_policies',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-feesfines',
  'rowCount' : '1'
}, {
  'tableName' : 'feesfines_owners',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-feesfines',
  'rowCount' : '0'
}, {
  'tableName' : 'feesfines_payments',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-feesfines',
  'rowCount' : '0'
}, {
  'tableName' : 'feesfines_refunds',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-feesfines',
  'rowCount' : '0'
}, {
  'tableName' : 'feesfines_transfer_criterias',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-feesfines',
  'rowCount' : '0'
}, {
  'tableName' : 'feesfines_transfers',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-feesfines',
  'rowCount' : '0'
}, {
  'tableName' : 'feesfines_waives',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-feesfines',
  'rowCount' : '0'
}, {
  'tableName' : 'course_copyrightstatuses',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-courses',
  'rowCount' : '5'
}, {
  'tableName' : 'course_courselistings',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-courses',
  'rowCount' : '3'
}, {
  'tableName' : 'course_courses',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-courses',
  'rowCount' : '5'
}, {
  'tableName' : 'course_coursetypes',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-courses',
  'rowCount' : '3'
}, {
  'tableName' : 'course_departments',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-courses',
  'rowCount' : '2'
}, {
  'tableName' : 'course_processingstatuses',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-courses',
  'rowCount' : '3'
}, {
  'tableName' : 'course_reserves',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-courses',
  'rowCount' : '2'
}, {
  'tableName' : 'course_roles',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-courses',
  'rowCount' : '0'
}, {
  'tableName' : 'course_terms',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-courses',
  'rowCount' : '3'
}, {
  'tableName' : 'finance_budgets',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-finance-storage',
  'rowCount' : '21'
}, {
  'tableName' : 'finance_fiscal_years',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-finance-storage',
  'rowCount' : '4'
}, {
  'tableName' : 'finance_fund_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-finance-storage',
  'rowCount' : '26'
}, {
  'tableName' : 'finance_funds',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-finance-storage',
  'rowCount' : '21'
}, {
  'tableName' : 'finance_group_fund_fiscal_years',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-finance-storage',
  'rowCount' : '12'
}, {
  'tableName' : 'finance_groups',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-finance-storage',
  'rowCount' : '1'
}, {
  'tableName' : 'finance_ledgers',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-finance-storage',
  'rowCount' : '3'
}, {
  'tableName' : 'finance_transactions',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-finance-storage',
  'rowCount' : '16'
}, {
  'tableName' : 'inventory_alternative_title_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '11'
}, {
  'tableName' : 'inventory_call_number_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '12'
}, {
  'tableName' : 'inventory_classification_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '10'
}, {
  'tableName' : 'inventory_contributor_name_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '3'
}, {
  'tableName' : 'inventory_contributor_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '268'
}, {
  'tableName' : 'inventory_electronic_access_relationships',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '5'
}, {
  'tableName' : 'inventory_holdings_note_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '7'
}, {
  'tableName' : 'inventory_holdings',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '12'
}, {
  'tableName' : 'inventory_holdings_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '5'
}, {
  'tableName' : 'inventory_identifier_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '24'
}, {
  'tableName' : 'inventory_ill_policies',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '8'
}, {
  'tableName' : 'inventory_instance_formats',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '56'
}, {
  'tableName' : 'inventory_instance_note_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '53'
}, {
  'tableName' : 'inventory_instance_relationship_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '3'
}, {
  'tableName' : 'inventory_instance_statuses',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '6'
}, {
  'tableName' : 'inventory_instance_relationships',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '5'
}, {
  'tableName' : 'inventory_instances',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '29'
}, {
  'tableName' : 'inventory_instance_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '25'
}, {
  'tableName' : 'inventory_item_damaged_statuses',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '2'
}, {
  'tableName' : 'inventory_item_note_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '7'
}, {
  'tableName' : 'inventory_items',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '17'
}, {
  'tableName' : 'inventory_campuses',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '2'
}, {
  'tableName' : 'inventory_institutions',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '1'
}, {
  'tableName' : 'inventory_libraries',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '2'
}, {
  'tableName' : 'inventory_loan_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '4'
}, {
  'tableName' : 'inventory_locations',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '6'
}, {
  'tableName' : 'inventory_material_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '8'
}, {
  'tableName' : 'inventory_modes_of_issuance',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '5'
}, {
  'tableName' : 'inventory_nature_of_content_terms',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '21'
}, {
  'tableName' : 'inventory_service_points',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '3'
}, {
  'tableName' : 'inventory_service_points_users',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '301'
}, {
  'tableName' : 'inventory_statistical_code_types',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '4'
}, {
  'tableName' : 'inventory_statistical_codes',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-inventory-storage',
  'rowCount' : '28'
}, {
  'tableName' : 'invoice_lines',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-invoice-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'invoice_invoices',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-invoice-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'invoice_voucher_lines',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-invoice-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'invoice_vouchers',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-invoice-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'acquisitions_memberships',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-orders-storage',
  'rowCount' : '1'
}, {
  'tableName' : 'acquisitions_units',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-orders-storage',
  'rowCount' : '1'
}, {
  'tableName' : 'po_alerts',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-orders-storage',
  'rowCount' : '1'
}, {
  'tableName' : 'po_order_invoice_relns',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-orders-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'po_order_templates',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-orders-storage',
  'rowCount' : '5'
}, {
  'tableName' : 'po_pieces',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-orders-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'po_lines',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-orders-storage',
  'rowCount' : '5'
}, {
  'tableName' : 'po_purchase_orders',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-orders-storage',
  'rowCount' : '6'
}, {
  'tableName' : 'po_receiving_history',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-orders-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'po_reporting_codes',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-orders-storage',
  'rowCount' : '1'
}, {
  'tableName' : 'organization_addresses',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-organizations-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'organization_categories',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-organizations-storage',
  'rowCount' : '4'
}, {
  'tableName' : 'organization_contacts',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-organizations-storage',
  'rowCount' : '13'
}, {
  'tableName' : 'organization_emails',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-organizations-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'organization_interfaces',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-organizations-storage',
  'rowCount' : '13'
}, {
  'tableName' : 'organization_organizations',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-organizations-storage',
  'rowCount' : '16'
}, {
  'tableName' : 'organization_phone_numbers',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-organizations-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'organization_urls',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-organizations-storage',
  'rowCount' : '0'
}, {
  'tableName' : 'user_addresstypes',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-users',
  'rowCount' : '6'
}, {
  'tableName' : 'user_departments',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-users',
  'rowCount' : '0'
}, {
  'tableName' : 'user_groups',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-users',
  'rowCount' : '4'
}, {
  'tableName' : 'user_proxiesfor',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-users',
  'rowCount' : '0'
}, {
  'tableName' : 'user_users',
  'documentationUrl' : 'https://dev.folio.org/reference/api/#mod-users',
  'rowCount' : '305'
}]) });

module.exports = { ldpTablesResponse };
