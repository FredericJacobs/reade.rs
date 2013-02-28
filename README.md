# Reade.rs

## Features :
- Voice of articles
- Pop-up for links
- Scroll with indicator like New Republic

## Technical

### DB-Schemes

**Author** : 
Bio : STRING
fullname: STRING
username: STRING
links : {
	TWITTER:STRING
	WEBSITE:STRING
}

**Story**
layout: STRING //specify specific css
title: STRING
author: STRING //username of the author
published: BOOL
slug: STRING
date: DATE
category: ARRAY
tags : ARRAY
post : STRING

