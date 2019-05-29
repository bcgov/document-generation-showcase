---
 title: DGEN Developer’s Guide
 description: Merge templates, images and structured data into an output document. Uses microsoft office templates. XML is the only [data format](https://www.windwardstudios.com/content/datasource) implemented. Referenced resource files like images must be stored with the template in DMS(WCC). Document of [various formats](https://www.windwardstudios.com/content/output-formats) can be produced.
---

The Document Generation service (DGEN) provides the capability to generate documents using template files that contains field values retrieved from a database. Once generated, the completed document  is stored in the Document Management Service (DMS) repository where it is available for viewing and signing using an electronic signature. The Document Generation service (DGEN) can be accessed programmatically via the [DGEN-API.](https://api.nrs.gov.bc.ca/dgen-api/ ) A description of the API can be found in [NRM API Store](https://apistore.nrs.gov.bc.ca/store/apis/info?name=dgen-api&version=v1&provider=admin).

## How It Works

The Document Generation Service is based upon a commercial product from [Windward](https://www.windwardstudios.com/). The DGEN-API exposes some of the services provided by Windward's document generation engine. The DGEN-API provides a layer of abstraction between the Windward commercial product and users of the DGEN service. If required, Windward could be swapped out at a later date to be replaced by an open source product without requiring changes to the DGEN-API.

Some business areas within the Natural Resource Ministries (NRM) have built customized document generation engines (e.g Crown Lands, e-Licensing). However, these custom built document generation engines tend to be maintenance intensive, are limited to specific business areas and technologies, and require updates each time Microsoft Office on the desktop is updated. 

The Windward document generation engine is a server-based process that can be used by any business area within the NRM. It is compatible with Microsoft Office tools. But unlike Microsoft Office macros, the Windward document templates are XML-based and have minimal dependencies on specific versions of Microsoft Office. DGEN uses XML template files that are developed using Windward's Template Designer plug-in Windward offers a number of quick-start materials available [here](https://www.windwardstudios.com/resources/quick-start).

All access to the DGEN service **must** be through the [DGEN-API](https://api.nrs.gov.bc.ca/dgen-api/ )

## Limitations of the DGEN-API

When creating a document generation template using the DGEN-API it is important to understand the following:

- The DGEN-API does not support multiple data sources, so only one data source can be used.
- The DGEN-API currently supports only XML files, so only an XML data source can be used.
- When linking a data source with Windward's Template Designer to a new template file, the data source name must be **empty**. While working on a template, you will then notice that the tag refers to the data source as "{no name given}". This is the expected behavior as the DGEN-API cannot currently take a data source name.

If a template references an external resource with the ImportTag feature, the data source XML file must follow these guidelines:

- External resources must be stored in the Document Management System. Resources are managed using Windward's Template Designer.
- A resource needs to have a Production status to be usable in Production mode (when isTemporary = false). This status can be set in Windward's Template Designer.
- Links to resources need to be added to the XML data source using a map XML tag with an id attribute of "ImportedResourceLinks". This map must be placed under the root tag of the XML data source. Each resource link will be a separate entry with an attribute id that can be used in the template.

## Security

To use the DGEN-API, applications and/or users that call the API must have one of the following roles in WebADE:

- DGEN_DOCGEN_USER lets business users/services generate a document
- DGEN_TEMPLATE_DESIGNER lets template designers design and test document generation


## Getting Started with the Template Designer

If you will be creating Windward template files, you must install the [Windward Report Designer](https://www.windwardstudios.com/solution/windward-designer) on your workstation. IIT manages a pool of licenses for this product. Documentation, tutorials, and support for Windward Template Designer can be found here: [Windward Tutorials](https://www.windwardstudios.com/training-guide/xml-data-to-word).                 

You will need to have a good understanding of the layout of the target document that you wish to generate. For example, form letters, permits and authorization documents are often good candidates for document generation. In particular, you will need to know what dynamic data elements will be included in your generated document. Dynamic data elements are retrieved from a database. For example, client name and client address are often used as dynamic data elements in generated documents. Once you have identified all of the dynamic data elements in the document, you can begin to build the template that will be used to generate the document. Although the tools are different, the process of document generation using DGEN is very similar to creating generated documents using the mail merge capabilities in Microsoft Office.

The following set-up activities are required: 

1. Business areas wanting to use the DGEN are provided with an IRS acronym for their service; this acronym will be used to configure line-of-business specific security to control access to templates and documents.
2. The necessary configuration changes have been made in WebCenter Content (WCC); configuration in WCC is required to support business area specific output from DGEN.
3. A DGEN templates folder has been created for business area files. The folder name, metadata and security has been specified. The folder has been created and access has been granted through WebADE.
4. Any user who will be developing templates will require the DGEN_TEMPLATE_DESIGNER role in WebADE.
5. [Windward Report Designer](https://www.windwardstudios.com/solution/windward-designer) has been installed on the local workstation.

Template designers create document templates using [Windward Report Designer](https://www.windwardstudios.com/solution/windward-designer)r, a plug-in to Microsoft Office. Template designers will use the plug-in to design, format, edit, and configure reusable document templates. Template designers have the capability to generate test documents. When a user submits a request to generate a test document, the template document and resource files must reside in the DMS repository.

<u>Note:</u> Only test documents are generated using the Windward Designer interface. Final documents are generated using the DGEN API.

## Resource File

Resources are common elements referenced by the data documents that can be reused across multiple templates. The resources are standalone elements and must be stored in the DMS document repository. Resources include elements, such as headers, footers, spreadsheets, ministry names, other templates, addresses, logos, and images. The template designer must ensure that the status of all the referenced resource files is set to Production for the resource to be used in final client document generation.

## Using the DGEN API

Business area staff can use the DGEN-API to generate both test and final client documents. The generated documents are based on specified document templates and data from a database. Staff must provide both a document template and a data source when using the DGEN-API to submit document generation jobs. Staff provide the URL for each of the template and resource document when submitting the request using the DGEN-API. Resource files must be stored in the DMS repository. The resource file URLs are used to reference the exact location and revision of the resource. The generated documents are stored in specified engagement folders created in DMS. All final client documents are stored indefinitely.

Document templates, data documents, and resources are required in order to generate both test and final documents within DG. Users need to create all three file types prior to using DG.

The DGEN-API endpoints can be viewed through the [NRM API Store](https://apistore.nrs.gov.bc.ca/store/apis/info?name=dgen-api&version=v1&provider=admin)

