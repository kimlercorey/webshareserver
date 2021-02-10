


create or replace procedure seo.insert_update_domain(v_baseurl varchar(100), v_url varchar(200))
language plpgsql
as $$
-- variable declaration

	declare v_baseid int;
	declare v_urlid int;

begin
	
	select domainid into v_baseid from seo.domains where domainname = v_baseurl;
	
	if v_baseid is null then
		insert into seo.domains(domainname, lastupdated) values(v_baseurl, now());
		select domainid into v_baseid from seo.domains where domainname = v_baseurl;
	end if;

	if v_baseid is not null then
		update seo.domains set lastupdated = now() where domainid = v_baseid;
	end if;	

	if v_baseurl != v_url  and length(v_baseurl) > 0 then
	
		select domainid into v_urlid from seo.domains where domainname = v_url;
	
		if v_urlid is null then
			insert into seo.domains(domainname, parentid, lastupdated) values(v_url, v_baseid, now());
		end if;
	
	end if;

end; $$



/*
create or replace procedure seo.insert_update_domain(v_baseurl varchar(100), v_url varchar(200))
language plpgsql
as $$
*/











