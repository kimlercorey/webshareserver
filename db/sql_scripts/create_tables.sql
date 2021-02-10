


--			select * from seo.settings

--					select domainname from seo.domains where domainid = 2

drop table seo.domains;

CREATE TABLE seo.domains(
	domainId serial PRIMARY KEY,
	domainName varchar(100),
	parentid int,
	lastupdated timestamptz
);


CREATE TABLE seo.tags(
	tagId serial PRIMARY KEY,
	tagName varchar(50)
)


drop table seo.links;

create table seo.links(
linkId serial primary key,
domainId int,
linkText varchar(1000),
lastUpdateInsert timestamp default(now())
)















